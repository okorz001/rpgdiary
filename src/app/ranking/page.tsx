import { type Metadata } from 'next'

import Article from '@/components/Article'
import { getArticleData } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Enjoyment Ranking',
  description: 'The RPGs I most enjoyed playing',
}

export default async function RankingPage() {
  const article = await getArticleData('.', 'ranking')
  return <Article {...article} />
}
