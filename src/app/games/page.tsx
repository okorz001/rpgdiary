import { type Metadata } from 'next'

import GameLink from '@/components/GameLink'
import { type GameInfo, getGameInfos, getGameName } from '@/lib/games'

export const metadata: Metadata = {
  title: 'Games',
  description: 'List of played games',
}

export default function GamesPage() {
  const games = Object.entries(getGameInfos())

  return (
    <table className="w-fit mx-auto text-nowrap">
      <thead>
        <tr className="child:p-4">
          <th>Name</th>
          <th>Year</th>
          <th className="max-[380px]:hidden">System</th>
          <th className="max-[525px]:hidden">Developer</th>
          <th className="max-[625px]:hidden">Publisher</th>
        </tr>
      </thead>
      <tbody>
        {games.map(([slug, game]) => createGameRow(slug, game))}
      </tbody>
    </table>
  )
}

function createGameRow(slug: string, game: GameInfo) {
  return (
    <tr key={slug} className="align-top odd:bg-black/10 child:p-4">
      <td><GameLink slug={slug}>{createList(game.title.value)}</GameLink></td>
      <td>{game.year.value}</td>
      <td className="max-[380px]:hidden">{createList(game.system.value)}</td>
      <td className="max-[525px]:hidden">{createList(game.developer.value)}</td>
      <td className="max-[625px]:hidden">{createList(game.publisher.value)}</td>
    </tr>
  )
}

function createList(values: string[]) {
  return <ul>{values.map((it, n) => <li key={n}>{it}</li>)}</ul>
}
