import { type Metadata } from 'next'

import { getGameArticle, getGameInfo, getGameName, getGameRanking, getGameSlugs } from '@/lib/games'

type PageParams = {
  slug: string
}

export function generateStaticParams(): PageParams[] {
  return getGameSlugs().map(slug => ({ slug }))
}

export async function generateMetadata(props): Promise<Metadata> {
  const params = await props.params;
  const game = getGameInfo(params.slug)
  const title = getGameName(game)
  return {
    title,
    description: `My personal experiences playing ${title}`,
  }
}

export default async function GamePage(props) {
  const params = await props.params;
  const { slug } = params
  const game = getGameInfo(slug)
  const title = getGameName(game)

  const ranking = getGameRanking()
  const date = ranking.find(it => it.slug == slug)?.date

  const MDXContent = getGameArticle(slug)
  return <MDXContent date={date} title={title} slug={slug} game={game} />
}
