'use client'

import { useState } from 'react'

import { PropsWithChildren } from '@/components'
import Modal from '@/components/Modal'

export type FigureProps = PropsWithChildren & {
  src: string
}

export default function Figure(props: FigureProps) {
  const [modal, enableModal] = useState(false)
  return (
    <>
      <figure onClick={() => enableModal(true)} className="cursor-pointer rounded-xl bg-tertiary/30 p-2">
        <img src={props.src} className="max-w-figure max-h-figure mx-auto" />
        <figcaption className="mt-1 -mb-1 text-center text-sm">{props.children}</figcaption>
      </figure>
      {modal && (
        <Modal onClick={() => enableModal(false)}>
          <div className="h-full flex justify-center items-center">
            <img src={props.src} className="max-w-[90%] max-h-[90%]" />
          </div>
        </Modal>
      )}
    </>
  )
}
