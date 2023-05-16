import Router from 'next/router'
import { useEffect } from 'react'

import Layout from '@/components/Layout'

// "/" is used instead of "/page/1", so just redirect there.

export default function RedirectPage() {
  useEffect(() => {
    Router.push('/')
  })
  return <Layout />
}
