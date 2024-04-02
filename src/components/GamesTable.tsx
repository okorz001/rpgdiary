'use client'

import { useState } from 'react'

import GameLink from '@/components/GameLink'
import { type GameInfo, getGameInfos } from '@/lib/games'

export default function GamesTable() {
  const [systemsText, setSystemsText] = useState('')
  const [companiesText, setCompaniesText] = useState('')
  const [includeDevelopers, setIncludeDevelopers] = useState(true)
  const [includePublishers, setIncludePublishers] = useState(true)
  const [sort, setSort] = useState('default')

  const allGames = Object.entries(getGameInfos())
  let games = allGames

  // TODO: these searches should probably not be case-sensitive
  const systems = systemsText.split(',').map(it => it.trim()).filter(it => it)
  if (systems.length) {
    games = games.filter(it => it[1].system.value.some(system => systems.includes(system)))
  }

  const companies = companiesText.split(',').map(it => it.trim()).filter(it => it)
  if (companies.length) {
    games = games.filter(it => {
      let gameCompanies: string[] = []
      if (includeDevelopers) gameCompanies = gameCompanies.concat(it[1].developer.value)
      if (includePublishers) gameCompanies = gameCompanies.concat(it[1].publisher.value)
      return gameCompanies.some(company => companies.includes(company))
    })
  }

  // default sort is no-op
  if (sort === 'year') {
    games.sort((a, b) => {
      return a[1].year.value - b[1].year.value
    })
  }

  return (
    <div>
      <form className="my-4 w-fit mx-auto rounded-xl bg-tertiary p-2 grid grid-cols-[max-content,_auto] gap-2">
        <label className="font-bold">Systems:</label>
        <input className="bg-tertiary border-b-[1px]" type="text" value={systemsText} onChange={e => setSystemsText(e.target.value)} />

        <label className="font-bold">Companies:</label>
        <input className="bg-tertiary border-b-[1px]" type="text" value={companiesText} onChange={e => setCompaniesText(e.target.value)} />

        <div className="col-span-2 text-center child:m-1">
          <input type="checkbox" checked={includeDevelopers} onChange={e => setIncludeDevelopers(e.target.checked)} />
          <label className="font-bold">Developers</label>

          <input type="checkbox" checked={includePublishers} onChange={e => setIncludePublishers(e.target.checked)} />
          <label className="font-bold">Publishers</label>
        </div>

        <label className="font-bold">Sort:</label>
        <select className="bg-tertiary justify-self-end" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="year">Year</option>
        </select>
      </form>
      
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
    </div>
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
