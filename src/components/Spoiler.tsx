'use client'

import { useState } from 'react'

import { PropsWithChildren } from '@/components'

export default function Spoiler(props: PropsWithChildren) {
  const [visible, setVisible] = useState(false)
  const toggleClick = () => setVisible(!visible)
  return (
    <span onClick={toggleClick} className={`
      cursor-pointer transition-colors ease-in bg-black ${visible ? 'text-white/80' : 'text-black'}
    `}>
      {props.children}
    </span>
  )
}
