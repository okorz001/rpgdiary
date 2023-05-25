'use client'

import { useContext, type ReactNode } from 'react'

import Link from '@/components/Link'
import { RankingContext } from '@/components/RankingContext'
import { type ArticleMeta } from '@/lib/articles'

export type GameRankingProps = {
  game?: string
}

export default function GameRanking(props: GameRankingProps) {
  let ranking = useContext(RankingContext)
  let start = 1
  let moreBefore = false
  let moreAfter = false

  if (props.game) {
    // preserve historical ranking by filtering out games added after this game
    const game = ranking.find(it => it.slug == props.game)
    if (game) {
      ranking = ranking.filter(it => it.date && game.date && it.date <= game.date)

      // only show 5 items. preferably 2 before and 2 above.
      if (ranking.length > 5) {
        let index = ranking.findIndex(it => it.slug == props.game)
        let startIndex: number
        if (index <= 2) {
          // there are 2 or less items before this item.
          startIndex = 0
          moreAfter = true
        } else if (index + 2 >= ranking.length - 1) {
          // the are 2 or less items after this item
          startIndex = ranking.length - 5
          moreBefore = true
        } else {
          // there are 2+ items before and after this item
          startIndex = index - 2
          moreBefore = true
          moreAfter = true
        }
        ranking = ranking.slice(startIndex, startIndex + 5)
        start = startIndex + 1
      }
    }
  }

  return (
    <div className="grid grid-cols-list gap-2 justify-center my-4">
      <div className="col-span-2 text-center font-bold">Most Enjoyed</div>
      <ul className="contents text-xl font-serif">
        {moreBefore && createMoreItem()}
        {ranking.map((it, index) => createItem(it, index + start, props.game))}
        {moreAfter && createMoreItem()}
      </ul>
      <div className="col-span-2 text-center font-bold">Least Enjoyed</div>
    </div>
  )
}

function createItem(game: ArticleMeta, rank: number, selected?: string) {
  let marker: ReactNode = `${rank}. `
  let value: ReactNode = game.title
  if (game.slug == selected) {
    marker = <>➡︎ {marker}</>
  } else {
    value = <Link href={`/games/${game.slug}`}>{value}</Link>
  }

  return (
    <li key={game.slug} className="contents">
      <span className="text-right">{marker}</span>
      <span>{value}</span>
    </li>
  )
}

function createMoreItem() {
  return <li className="col-span-2 -my-1.5 font-bold text-center">·&nbsp;·&nbsp;·</li>
}
