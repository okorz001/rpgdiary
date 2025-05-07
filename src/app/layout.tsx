import { type Metadata } from 'next'
import { Figtree, Playfair_Display } from 'next/font/google'

import '@/app/globals.css'
import { PropsWithChildren } from '@/components'
import NavBar from '@/components/NavBar'

// These are broken in Next.JS 13.5.4
// see: https://github.com/vercel/next.js/issues/56253
//export const dynamic = 'error'
//export const dynamicParams = false

export const metadata: Metadata = {
  title: {
    default: 'RPG Diary',
    template: '%s - RPG Diary',
  },
  manifest: '/site.webmanifest',
  description: 'My personal experiences playing RPGs',
}

const fontSans = Figtree({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-sans',
})

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-serif',
})

const fonts = [fontSans, fontSerif]
const fontClasses = fonts.map(it => it.variable).join(' ')

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/images/favicon.svg/raw.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/images/favicon.svg/favicon48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/images/favicon.svg/favicon32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/images/favicon.svg/favicon16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/images/icon.svg/appleTouchIcon.png" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={`
        w-full min-w-[280px] min-h-full grid grid-rows-[max-content_1fr_max-content]
        bg-background text-text/80 font-sans ${fontClasses}
      `}>
        <NavBar />
        <main className="w-full max-w-[768px] mx-auto bg-paper divide-y divide-text/20">
          {props.children}
          <footer className="w-full max-w-[768px] mx-auto text-sm text-center p-2">
            &copy;2022-{new Date().getFullYear()} Oscar Korz &mdash; All rights reserved
          </footer>
        </main>
      </body>
    </html>
  )
}
