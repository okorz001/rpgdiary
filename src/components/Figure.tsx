import { useContext } from 'react'

import { PropsWithChildren } from '@/components'
import { ModalContext } from '@/components/ModalContext'

export type FigureProps = PropsWithChildren & {
  src: string
}

export default function Figure(props: FigureProps) {
  // TODO: click to toggle fullscreen modal
  const { setModal } = useContext(ModalContext)
  const modal = (
    <div className="h-full flex justify-center items-center">
      <img src={props.src} className="max-w-[90%] max-h-[90%] object-contain" />
    </div>
  )
  return (
    <figure onClick={() => setModal(modal)} className="max-w-[200px] rounded-xl bg-figure">
      <img src={props.src} className="max-w-[200px] max-h-[200px]" />
      <figcaption className="text-center text-sm">{props.children}</figcaption>
    </figure>
  )
}
