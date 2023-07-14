import { type ComponentType, type ReactNode } from 'react'

export type PropsWithChildren = {
  children?: ReactNode
}

export function createComponent<P>(name: string, delegate: ComponentType<P>) {
  delegate.displayName = name
  return delegate
}
