import { type Metadata } from 'next'

import MDXContent from './content.mdx'

export const metadata: Metadata = {
  title: 'About',
  description: 'Information about the site and its author',
}

export default function RankingPage() {
  return <MDXContent title="About" />
}
