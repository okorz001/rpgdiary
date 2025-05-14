import range from 'lodash/range'
import sortBy from 'lodash/sortBy'
import { type Metadata } from 'next'

import GamePage from '@/app/games/[slug]/page'
import Link from '@/components/Link'
import Paper from '@/components/Paper'
import { getGameRanking, getGameSlugs } from '@/lib/games'

const PAGE_SIZE = 5

type PageParams = {
  page: string
}

export function generateStaticParams(): PageParams[] {
  const slugs = getGameSlugs()
  // generate a path for every page EXCEPT 1. "/" is used instead of "/pages/1"
  return range(2, getNumPages(slugs) + 1)
    // next throws if it is not a string here
    .map(page => ({ page: page.toString() }))
}

export async function generateMetadata(props) {
  const params = await props.params
  return {
    // override the template from the layout
    title: { absolute: `RPG Diary (Page ${params.page})` },
  } as Metadata
}

export default async function LatestPage(props) {
  const params = await props.params
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

  const nav = createNav(page, numPages)
  const articles = ranking.map(({ slug }) => GamePage({ key: slug, params: { slug } }))
  return <>{nav}{articles}{nav}</>
}

function getNumPages(things: any[]) {
  return Math.ceil(things.length / PAGE_SIZE)
}

function createNav(page: number, count: number) {
  const createLink = (to: number, label: string) => {
    if (to >= 1 && to <= count && to != page) {
      return <Link href={to == 1 ? '/' : `/pages/${to}`}>{label}</Link>
    } else {
      return <span className="text-text/30">{label}</span>
    }
  }
  return (
    <Paper>
      <nav className="p-2 flex justify-center *:px-2 *:text-nowrap">
        <div className="text-xl -my-1">{createLink(1, '<<')}</div>
        <div className="text-xl -my-1">{createLink(page - 1, '<')}</div>
        <div className="text-sm">Page {page} of {count}</div>
        <div className="text-xl -my-1">{createLink(page + 1, '>')}</div>
        <div className="text-xl -my-1">{createLink(count, '>>')}</div>
      </nav>
    </Paper>
  )
}
