import { type Metadata } from 'next'
import { Figtree, Playfair_Display } from 'next/font/google'

import '@/app/globals.css'
import { PropsWithChildren } from '@/components'
import NavBar from '@/components/NavBar'
import { RankingContextProvider } from '@/components/RankingContext'
import { getGameRanking } from '@/lib/articles'

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

export default async function RootLayout(props: PropsWithChildren) {
  const ranking = await getGameRanking()
  // TODO: allow toggling dark mode
  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`
        w-full min-w-body min-h-full grid grid-rows-layout
        bg-background text-text/80 dark:bg-background-dark dark:text-text-dark/80 font-sans ${fontClasses}
      `}>
        <RankingContextProvider ranking={ranking}>
          <NavBar />
          <main className="w-full max-w-main mx-auto bg-paper dark:bg-paper-dark divide-y divide-text/20 dark:divide-text-dark/20">
            {props.children}
            <footer className="w-full max-w-main mx-auto text-sm text-center p-2">
              &copy;2023 Oscar Korz &mdash; All rights reserved
            </footer>
          </main>
        </RankingContextProvider>
      </body>
    </html>
  )
}
