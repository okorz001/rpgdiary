'use client'

import { useState } from 'react'

import { PropsWithChildren } from '@/components'

export default function Spoiler(props: PropsWithChildren) {
  const [visible, setVisible] = useState(false)
  const toggleClick = () => setVisible(!visible)

  // use visible: hidden to suppress pointer events, e.g. clicking links
  // use opacity for transitions (it doesn't work with visible)
  const visibleClass = visible ? 'visible opacity-100' : 'invisible opacity-0'

  return (
    <span onClick={toggleClick} className="cursor-pointer bg-black text-white/80">
      <span className={`transition-all ease-in bg-black ${visibleClass}`}>
        {props.children}
      </span>
    </span>
  )
}
