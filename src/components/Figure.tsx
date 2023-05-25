'use client'

import { useContext } from 'react'

import { PropsWithChildren } from '@/components'
import { ModalContext } from '@/components/ModalContext'

export type FigureProps = PropsWithChildren & {
  src: string
}

export default function Figure(props: FigureProps) {
  const { setModal } = useContext(ModalContext)
  const modal = (
    <div className="h-full flex justify-center items-center">
      <img src={props.src} className="max-w-[90%] max-h-[90%]" />
    </div>
  )
  return (
    <figure onClick={() => setModal(modal)} className="rounded-xl bg-figure/80 p-2">
      <img src={props.src} className="max-w-figure max-h-figure mx-auto" />
      <figcaption className="mt-1 -mb-1 text-center text-sm">{props.children}</figcaption>
    </figure>
  )
}
