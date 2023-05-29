'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NavBar() {
  const [hasMenu, setHasMenu] = useState<boolean>(false)
  const toggleMenu = () => setHasMenu(!hasMenu)
  const hideMenu = () => setHasMenu(false)

  const createLink = (label: string, href: string) => (
    <Link href={href} onClick={hideMenu} className="font-bold uppercase px-4 py-4 nb:py-1.5">
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 w-full drop-shadow-xl bg-primary text-primaryContrast">
      <div className="w-full max-w-main mx-auto flex justify-between items-center px-4 py-1.5">
        <Link href="/" className="-mt-0.5 mb-0.5 flex gap-1 items-end">
          <img src="/assets/logo.svg" alt="RPG Diary logo" className="h-8" />
          <h1 className="text-3xl font-serif">RPG&nbsp;Diary</h1>
        </Link>
        <button onClick={toggleMenu} className="text-3xl px-4 nb:hidden">⋮</button>
        <nav className={`
          grid grid-flow-col divide-x divide-y-0 divide-primaryContrast/40
            max-nb:grid-flow-row max-nb:divide-x-0 max-nb:divide-y max-nb:divide-text/20 max-nb:dark:divide-text-dark/20
          ${hasMenu ? 'max-nb:absolute' : 'max-nb:hidden'} max-nb:top-12 max-nb:right-4 max-nb:min-w-[160px]
            max-nb:border-b-2 max-nb:border-x-2 max-nb:border-text/20 max-nb:dark:border-text-dark/20
            max-nb:bg-paper max-nb:text-text/80 max-nb:dark:bg-paper-dark max-nb:dark:text-text-dark/80
        `}>
          {createLink('Latest', '/')}
          {createLink('Ranking', '/ranking')}
        </nav>
      </div>
    </header>
  )
}
