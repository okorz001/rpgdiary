import range from 'lodash/range'
import sortBy from 'lodash/sortBy'
import { type Metadata } from 'next'

import GamePage from '@/app/games/[slug]/page'
import PageNav from '@/components/PageNav'
import { getGameRanking, getGameSlugs } from '@/lib/games'

const PAGE_SIZE = 5

type PageParams = {
  page: string
}

// TODO: Does Next define a type for this?
type PageContext = {
  params: PageParams
}

export function generateStaticParams(): PageParams[] {
  const slugs = getGameSlugs()
  // generate a path for every page EXCEPT 1. "/" is used instead of "/pages/1"
  return range(2, getNumPages(slugs) + 1)
    // next throws if it is not a string here
    .map(page => ({ page: page.toString() }))
}

export function generateMetadata({ params }: PageContext) {
  return {
    // override the template from the layout
    title: { absolute: `RPG Diary (Page ${params.page})` },
  } as Metadata
}

export default function LatestPage({ params }: PageContext) {
  let ranking = getGameRanking()
  const numPages = getNumPages(ranking)

  // sort by date, newest first
  ranking = sortBy(ranking, ['date'])
  ranking.reverse()

  // slice page contents
  const page = +params.page
  const start = (page - 1) * PAGE_SIZE
  const end = Math.min(start + PAGE_SIZE, ranking.length)
  ranking = ranking.slice(start, end)

  const articles = ranking.map(({ slug }) => <GamePage key={slug} params={{ slug }} />)

  return (
    <>
      {articles}
      <PageNav page={page} count={numPages} getHref={getHref} />
    </>
  )
}

function getNumPages(things: any[]) {
  return Math.ceil(things.length / PAGE_SIZE)
}

function getHref(page: number) {
  return page == 1 ? '/' : `/pages/${page}`
}
