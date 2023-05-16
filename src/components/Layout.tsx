import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'

import { PropsWithChildren } from '@/components'
import { ModalContext } from '@/components/ModalContext'

export type LayoutProps = PropsWithChildren & {
  subtitle?: string
}

// TODO: hardcoding some links now for dev
const LINKS = [
  { label: 'Latest', href: '/' },
  { label: 'Ranking', href: '/ranking' },
]

export default function Layout(props: LayoutProps) {
  const [modal, setModal] = useState<ReactNode>(null)

  let title = "RPG Diary"
  if (props.subtitle) {
    title = `${title}: ${props.subtitle}`
  }

  // TODO: maybe using grid + gap instead of flex + padding would simplify spacing
  return (
    <ModalContext.Provider value={{ setModal }}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="w-screen h-screen fixed left-0 right-0 top-0 z-[-1]">
        <img src="/assets/abandoned-castle.jpg" className="w-full h-full object-cover blur-[2px] scale-[1.01]" />
      </div>

      <div className="w-full h-full flex flex-col text-primary font-sans">
        {modal ? <Modal onClick={() => setModal(null)}>{modal}</Modal> : null}

        <header className="flex-initial bg-header">
          <div className="w-full md:w-[768px] mx-auto px-2 py-2">
            <h1 className="text-3xl font-serif text-center">RPG Diary</h1>
            <p className="text-sm text-center">My personal feelings playing RPGs.</p>
          </div>
        </header>

        <nav className="flex-initial bg-header">
          <div className="flex justify-evenly w-full md:w-[768px] mx-auto">
            {LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="flex-initial px-2 py-1 hover:bg-card/80 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <main className="flex-auto w-full md:w-[768px] mx-auto">
          {props.children}
        </main>

        <footer className="flex-initial bg-header">
          <div className="w-full md:w-[768px] mx-auto -mt-1 px-2 pb-2 text-sm text-center">
            &copy;2023 Oscar Korz &mdash; All rights reserved
          </div>
        </footer>
      </div>
    </ModalContext.Provider>
  )
}

function Modal({ onClick, children }) {
  // Prevent scrolling. Setting on the body to avoid losing the current scroll position.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  })

  return (
    <div
      onClick={onClick}
      className="z-10 fixed left-0 top-0 right-0 w-full h-full bg-black/60"
    >
      {children}
    </div>
  )
}
