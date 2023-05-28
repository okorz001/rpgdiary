'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { PropsWithChildren } from '@/components'

type ModalProps = PropsWithChildren & {
  onClick: () => void,
}

export default function Modal({ onClick, children }: ModalProps) {
  // Prevent scrolling. Setting on the body to avoid losing the current scroll position.
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  })

  const modal = (
    <div onClick={onClick} className="cursor-pointer z-modal fixed top-0 w-full h-full bg-black/60">
      {children}
    </div>
  )

  return createPortal(modal, document.body)
}
