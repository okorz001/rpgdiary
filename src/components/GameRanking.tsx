import GameLink from '@/components/GameLink'
import { getGameInfo, getGameName, getGameRanking, type GameRanking } from '@/lib/games'

export type GameRankingProps = {
  game?: string
}

export default function GameRanking(props: GameRankingProps) {
  let ranking = getGameRanking()
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
    <div className="w-fit mx-auto my-4 p-2 rounded-xl bg-tertiary">
      <div className="text-center text-lg font-bold">Most Enjoyed</div>
      {moreBefore && createMoreItem()}
      <ol className="list-inside list-decimal" start={start}>
        {ranking.map(it => createItem(it, props.game))}
      </ol>
      {moreAfter && createMoreItem()}
      <div className="text-center text-lg font-bold">Least Enjoyed</div>
    </div>
  )
}

function createItem(game: GameRanking, selected?: string) {
  const name = getGameName(getGameInfo(game.slug))
  return (
    <li key={game.slug}>
      {game.slug == selected ? <span className="font-bold">{name}</span> : <GameLink slug={game.slug} />}
    </li>
  )
}

function createMoreItem() {
  return <div className="-my-1 font-bold text-center">·&nbsp;·&nbsp;·</div>
}
