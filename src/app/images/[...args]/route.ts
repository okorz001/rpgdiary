import path from 'node:path'

import sharp from 'sharp'

import { getAllGameArticleMetas } from '@/lib/articles'

// during next build, process.cwd() is the repository directory
const IMAGES_DIR = path.resolve(process.cwd(), 'src/data/images')

export async function generateStaticParams() {
  const params = await getCoverThumbnailParams()
  return params
}

const COVER_PRESETS = ['full.webp', 'figure.webp']

async function getCoverThumbnailParams() {
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

  const preset = presets[args.preset]
  if (!preset) {
    throw new Error(`Unknown preset: ${preset}`)
  }

  const output = outputs[args.output]
  if (!output) {
    throw new Error(`Unknown output: ${output}`)
  }

  const file = path.resolve(IMAGES_DIR, args.path)
  const image = sharp(file)
  preset(image)
  output(image)
  const data = await image.toBuffer()
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
}

const outputs: {
  [preset: string]: (image: sharp.Sharp) => void
} = {
  webp: image => image.webp(),
}
