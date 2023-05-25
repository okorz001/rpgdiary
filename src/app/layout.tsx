import { type Metadata } from 'next'
import { Figtree, Playfair_Display } from 'next/font/google'

import { PropsWithChildren } from '@/components'
import Layout from '@/components/Layout'
import { RankingContextProvider } from '@/components/RankingContext'
import { getGameRanking } from '@/lib/articles'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'RPG Diary',
    template: 'RPG Diary: %s',
  },
  manifest: '/site.webmanifest',
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

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${fontClasses} w-full h-full bg-header text-primary font-sans`}>
        <Layout>
          <RankingContextProvider ranking={ranking}>
            {props.children}
          </RankingContextProvider>
        </Layout>
      </body>
    </html>
  )
}
