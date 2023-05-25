import { type Metadata } from 'next'

import Article from '@/components/Article'
import { getGameArticleData, getGameSlugs } from '@/lib/articles'

// TODO: how to typehint the params?

export async function generateStaticParams() {
  const slugs = await getGameSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const article = await getGameArticleData(params.slug)
  return {
    title: article.meta.title,
  } as Metadata
}

export default async function GamePage({ params }) {
  const article = await getGameArticleData(params.slug)
  return <Article {...article} />
}
