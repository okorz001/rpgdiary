'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type RedirectProps = {
  path: string
}

export default function Redirect(props: RedirectProps) {
  const router = useRouter()
  useEffect(() => {
    router.push(props.path)
  })
  return null
}
