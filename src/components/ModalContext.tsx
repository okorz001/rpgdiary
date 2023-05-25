'use client'

import { createContext, type ReactNode } from 'react'

export type ModalContextType = {
  setModal: (content: ReactNode) => void,
}

export const ModalContext = createContext<ModalContextType>({
  setModal: _ => { },
})
