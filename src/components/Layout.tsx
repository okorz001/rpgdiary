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
  const [hasMenu, setHasMenu] = useState<boolean>(false)
  const toggleMenu = () => setHasMenu(!hasMenu)
  const hideMenu = () => setHasMenu(false)

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

      <div className="w-full h-full min-w-body flex flex-col justify-start text-primary font-sans">
        {modal ? <Modal onClick={() => setModal(null)}>{modal}</Modal> : null}

        <header className="fixed top-0 left-0 right-0 h-header bg-header">
          <div className="w-full md:w-card mx-auto flex justify-between items-center px-4 py-1.5">
            <div className="flex gap-1 items-end">
              <img src="/assets/logo.svg" className="h-8" />
              <h1 className="text-3xl font-serif">RPG&nbsp;Diary</h1>
            </div>
            <button onClick={() => setHasMenu(!hasMenu)} className="text-3xl px-4 xs:hidden">⋮</button>
            <nav className={`
              grid grid-flow-row divide-primary
              ${hasMenu ? "max-xs:absolute" : "max-xs:hidden"} max-xs:top-12 max-xs:right-1 max-xs:bg-stone-950 max-xs:rounded-b-xl max-xs:divide-y
              xs:grid-flow-col xs:divide-x
            `}>
              {LINKS.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => setHasMenu(false)} className="font-bold uppercase px-4 py-4 xs:py-1.5">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="mt-header flex-auto w-full md:w-card mx-auto">
          {props.children}
        </main>

        <footer className="bg-header">
          <div className="w-full md:w-card mx-auto -mt-1 px-2 pb-2 text-sm text-center">
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
