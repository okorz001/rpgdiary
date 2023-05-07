import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'

import Article from '@/components/Article'
import Layout from '@/components/Layout'
import { RankingContext, type RankingContextType } from '@/components/RankingContext'
import { getGameArticleData, getGameRanking, getGameSlugs, type ArticleData } from '@/lib/articles'

type GamePageProps = {
  article: ArticleData
  ranking: RankingContextType
}

export default function GamePage(props: GamePageProps) {
  return (
    <Layout subtitle={props.article.meta.title}>
      <RankingContext.Provider value={props.ranking}>
        <Article {...props.article} />
      </RankingContext.Provider>
    </Layout>
  )
}

type GamePageParams = ParsedUrlQuery & {
  slug: string
}

export const getStaticPaths: GetStaticPaths<GamePageParams> = async () => {
  const slugs = await getGameSlugs()
  const paths = slugs.map(slug => ({ params: { slug } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<GamePageProps, GamePageParams> = async ({ params }) => {
  const article = await getGameArticleData(params.slug)
  const ranking = await getGameRanking()
  const props = { article, ranking }
  return { props }
}
