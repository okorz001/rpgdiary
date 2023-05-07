import { useContext } from 'react'

import Link from '@/components/Link'
import { RankingContext } from '@/components/RankingContext'

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
      ranking = ranking.filter(it => it.date <= game.date)

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

        if (moreBefore) {
          // the "more before" item consumes a number, so start one lower
          start = start - 1
        }
      }
    }
  }

  const items = ranking.map(it => {
    if (it.slug == props.game) {
      // don't link to self, add a marker
      return (
        <li key={it.slug}>
          <div className="absolute">
            <span className="relative right-12">➡️</span>
          </div>
          {it.title}
        </li>
      )
    } else {
      // link to other games
      return (
        <li key={it.slug}>
          <Link href={`/games/${it.slug}`}>{it.title}</Link>
        </li>
      )
    }
  })

  return (
    <div className="my-4">
      <div className="text-center font-bold">Most Enjoyed</div>
      <ol start={start} className="w-fit mx-auto my-2 list-decimal text-xl font-serif">
        {moreBefore && createMoreItem()}
        {items}
        {moreAfter && createMoreItem()}
      </ol>
      <div className="text-center font-bold">Least Enjoyed</div>
    </div>
  )
}

function createMoreItem() {
  return <li className="font-bold marker:content-none">.&nbsp;.&nbsp;.</li>
}
