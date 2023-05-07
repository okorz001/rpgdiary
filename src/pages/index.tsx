import sortBy from 'lodash/sortBy'
import type { GetStaticProps } from 'next'

import Article from '@/components/Article'
import Layout from '@/components/Layout'
import { RankingContext, type RankingContextType } from '@/components/RankingContext'
import { getAllGameArticleMetas, getGameArticleData, getGameRanking, type ArticleData } from '@/lib/articles'

type HomePageProps = {
  articles: ArticleData[],
  ranking: RankingContextType,
}

export default function HomePage(props: HomePageProps) {
  const articles = props.articles.map(it => <Article key={it.meta.slug} {...it} />)
  return (
    <Layout>
      <RankingContext.Provider value={props.ranking}>
        {articles}
      </RankingContext.Provider>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  let articleMetas = await getAllGameArticleMetas()
  // sort by date, newest first
  articleMetas = sortBy(articleMetas, ['date'])
  articleMetas.reverse()
  const articles = await Promise.all(articleMetas.map(it => getGameArticleData(it.slug)))
  const ranking = await getGameRanking()
  const props = { articles, ranking }
  return { props }
}
