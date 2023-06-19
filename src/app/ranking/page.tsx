import { type Metadata } from 'next'

import MDXContent from './content.mdx'

export const metadata: Metadata = {
  title: 'Enjoyment Ranking',
  description: 'The RPGs I most enjoyed playing',
}

export default function RankingPage() {
  return <MDXContent title="Enjoyment Ranking" />
}
