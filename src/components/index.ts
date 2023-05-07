import { type JSXElementConstructor, type ReactNode } from 'react'

export type PropsWithChildren = {
  children?: ReactNode
}

export function createComponent<P>(name: string, delegate: JSXElementConstructor<P>) {
  // @ts-ignore
  delegate.displayName = name
  return delegate
}
