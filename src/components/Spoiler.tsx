'use client'

import { useState } from 'react'

import { PropsWithChildren } from '@/components'

export default function Spoiler(props: PropsWithChildren) {
  const [visible, setVisible] = useState(false)
  const toggleClick = () => setVisible(!visible)
  return (
    <span
      className={visible ? "bg-black text-white" : "bg-black text-black"}
      onClick={toggleClick}
    >
      {props.children}
    </span>
  )
}
