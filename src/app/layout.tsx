import { type Metadata } from 'next'
import { Figtree, Playfair_Display } from 'next/font/google'
import NextLink from 'next/link'

import '@/app/globals.css'
import { PropsWithChildren } from '@/components'

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

const links: {
  label: string
  href: string
}[] = [
  {label: 'Games', href: '/games'},
  {label: 'Ranking', href: '/ranking'},
  {label: 'About', href: '/about'},
]

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" className={`h-full font-sans ${getFontClasses()}`}>
      <head>
        <link rel="icon" href="/images/favicon.svg/raw.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/images/favicon.svg/favicon48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/images/favicon.svg/favicon32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/images/favicon.svg/favicon16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/images/icon.svg/appleTouchIcon.png" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className="w-full min-w-[280px] flex flex-col items-center gap-2 bg-background text-text/80">
        <header className="sticky top-0 w-full flex justify-center bg-primary text-primaryContrast">
          <div className="flex-1 max-w-[768px] flex flex-col min-[425px]:flex-row justify-between items-center px-2 py-1.5">
            <NextLink href="/" className="-mt-0.5 mb-0.5 flex gap-1 items-end">
              <img width="32" height="32" src="/images/icon.svg/raw.svg" alt="RPG Diary icon" />
              <h1 className="text-3xl font-serif text-nowrap">RPG Diary</h1>
            </NextLink>
            <nav className="flex gap-4 font-bold text-sm min-[425px]:text-base uppercase">
              {links.map(it => <NextLink key={it.label} href={it.href}>{it.label}</NextLink>)}
            </nav>
          </div>
        </header>
        <main className="w-full max-w-[768px] flex flex-col gap-2">{props.children}</main>
        <footer className="text-sm text-center -my-2 py-2">
          &copy;2022-{new Date().getFullYear()} Oscar Korz &mdash; All rights reserved
        </footer>
      </body>
    </html>
  )
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

function getFontClasses() {
  return [fontSans, fontSerif].map(it => it.variable).join(' ')
}
