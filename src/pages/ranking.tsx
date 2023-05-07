import type { GetStaticProps } from 'next'

import Article from '@/components/Article'
import Layout from '@/components/Layout'
import { RankingContext, type RankingContextType } from '@/components/RankingContext'
import { getArticleData, getGameRanking, type ArticleData } from '@/lib/articles'

type RankingPageProps = {
  article: ArticleData
  ranking: RankingContextType
}

export default function RankingPage(props: RankingPageProps) {
  return (
    <Layout subtitle={props.article.meta.title}>
      <RankingContext.Provider value={props.ranking}>
        <Article {...props.article} />
      </RankingContext.Provider>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<RankingPageProps> = async () => {
  const article = await getArticleData('.', 'ranking')
  const ranking = await getGameRanking()
  const props = { article, ranking }
  return { props }
}
