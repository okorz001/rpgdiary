import { type AppProps } from 'next/app'
import { Figtree, Playfair_Display } from 'next/font/google'

import '@/styles/globals.css'

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

export default function App(props: AppProps) {
    return (
    <div className={`w-full h-full ${fontClasses}`}>
      <props.Component {...props.pageProps} />
    </div>
  )
}
