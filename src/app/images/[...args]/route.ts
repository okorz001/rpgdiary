import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { getAllGameArticleMetas } from '@/lib/articles'

// during next build, process.cwd() is the repository directory
const IMAGES_DIR = path.resolve(process.cwd(), 'src/data/images')

export async function generateStaticParams() {
  const params = await Promise.all([getFaviconParams(), getAppIconParams(), getCoverParams()])
  return params.flatMap(it => it)
}

const FAVICON_PATH = 'favicon.svg'
const FAVICON_PRESETS = ['raw.svg', 'favicon16.png', 'favicon32.png', 'favicon48.png']

function getFaviconParams() {
  const path = FAVICON_PATH.split('/')
  return FAVICON_PRESETS.map(preset => {
    return { args: [...path, preset] }
  })
}

const ICON_PATH = 'icon.svg'
const ICON_BG = 'hsl(189, 100%, 25%)'
const ICON_PRESETS = [
  'raw.svg',
  'appleTouchIcon.png',
  'icon192.png',
  'icon512.png',
  'icon1024.png',
  'icon512Maskable.png',
  'icon1024Maskable.png'
]

function getAppIconParams() {
  const path = ICON_PATH.split('/')
  return ICON_PRESETS.map(preset => {
    return { args: [...path, preset] }
  })
}

const COVER_PRESETS = ['full.webp', 'figure.webp']

async function getCoverParams() {
  const articleMetas = await getAllGameArticleMetas()
  return articleMetas.flatMap(article => {
    return (article.data?.covers || []).flatMap(cover => {
      const path = cover.image.split('/')
      return COVER_PRESETS.map(preset => {
        return { args: [...path, preset] }
      })
    })
  })
}

export async function GET(_, { params }) {
  const args = parseArgs(params.args)
  const file = path.resolve(IMAGES_DIR, args.path)

  let data: Buffer
  if (args.preset == 'raw') {
    // no transformations for raw, just read the file
    // TODO: this assume the output matches the source
    data = await fs.readFile(file)
  } else {
    const preset = presets[args.preset]
    if (!preset) {
      throw new Error(`Unknown preset: ${preset}`)
    }

    const output = outputs[args.output]
    if (!output) {
      throw new Error(`Unknown output: ${output}`)
    }

    const image = sharp(file)
    preset(image)
    output(image)
    data = await image.toBuffer()
  }

  return new Response(data)
}

function parseArgs(params: string[]) {
  const path = params.slice(0, -1).join('/')
  const [preset, output] = (params[params.length - 1] || '').split('.', 2)
  return { path, preset, output }
}

const presets: {
  [preset: string]: (image: sharp.Sharp) => void
} = {
  full: _ => { },
  figure: image => image.resize({ width: 200, height: 200, fit: 'inside' }),

  appleTouchIcon: iconPreset({ icon: 140, canvas: 180 }),
  icon192: iconPreset({ icon: 180, canvas: 192 }),
  icon512: iconPreset({ icon: 474, canvas: 512 }),
  icon1024: iconPreset({ icon: 950, canvas: 1024 }),
  icon512Maskable: iconPreset({ icon: 320, canvas: 512 }),
  icon1024Maskable: iconPreset({ icon: 640, canvas: 1024 }),

  favicon16: iconPreset({ icon: 16 }),
  favicon32: iconPreset({ icon: 32 }),
  favicon48: iconPreset({ icon: 48 }),
}

function iconPreset({
  icon,
  canvas,
}: {
  icon: number | { w: number, h: number },
  canvas?: number | { w: number, h: number },
}) {
  return (image: sharp.Sharp) => {
    const iconW = typeof icon === 'number' ? icon : icon.w
    const iconH = typeof icon === 'number' ? icon : icon.h
    image.resize({ width: iconW, height: iconH })

    if (canvas) {
      const canvasW = typeof canvas === 'number' ? canvas : canvas.w
      const extendX = (canvasW - iconW) / 2
      const canvasH = typeof canvas === 'number' ? canvas : canvas.h
      const extendY = (canvasH - iconH) / 2
      image.extend({ top: extendY, left: extendX, bottom: extendY, right: extendX, background: ICON_BG })
    }

    image.flatten({ background: ICON_BG })
  }
}

const outputs: {
  [preset: string]: (image: sharp.Sharp) => void
} = {
  png: image => image.png(),
  webp: image => image.webp(),
}
