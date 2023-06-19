import { type Metadata } from 'next'

import { getGameArticle, getGameInfo, getGameName, getGameRanking, getGameSlugs } from '@/lib/games'

type PageParams = {
  slug: string
}

// TODO: Does Next define a type for this?
type PageContext = {
  params: PageParams
}

export function generateStaticParams(): PageParams[] {
  return getGameSlugs().map(slug => ({ slug }))
}

export function generateMetadata({ params }: PageContext): Metadata {
  const game = getGameInfo(params.slug)
  const title = getGameName(game)
  return {
    title,
    description: `My personal experiences playing ${title}`,
  }
}

export default function GamePage({ params }: PageContext) {
  const { slug } = params
  const game = getGameInfo(slug)
  const title = getGameName(game)

  const ranking = getGameRanking()
  const date = ranking.find(it => it.slug == slug)?.date

  const MDXContent = getGameArticle(slug)
  return <MDXContent date={date} title={title} slug={slug} game={game} />
}
