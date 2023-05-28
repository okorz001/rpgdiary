import NextLink from 'next/link'

import { PropsWithChildren } from '@/components'

export type LinkProps = PropsWithChildren & {
  href: string
}

export default function Link(props: LinkProps) {
  const target = isExternal(props.href) ? '_blank' : '_self'
  return (
    <NextLink className="text-secondary" target={target} href={props.href}>
      {props.children}
    </NextLink>
  )
}

function isExternal(href: string) {
  return href.match(/^https?:/)
}
