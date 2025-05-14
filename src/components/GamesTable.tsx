'use client'

import { useState } from 'react'

import GameLink from '@/components/GameLink'
import { type GameInfo, getCompanies, getGameInfos, getSystems } from '@/lib/games'

export default function GamesTable() {
  const [system, setSystem] = useState('')
  const [company, setCompany] = useState('')
  const [includeDevelopers, setIncludeDevelopers] = useState(true)
  const [includePublishers, setIncludePublishers] = useState(true)
  const [release, setRelease] = useState('first')
  const [sort, setSort] = useState('default')

  const allGames = Object.entries(getGameInfos())
  const allSystems = getSystems()
  const allCompanies = getCompanies()

  let games = allGames

  // TODO: these searches should probably not be case-sensitive
  if (system) {
    games = games.filter(it => it[1].system.value.includes(system))
  }

  if (company) {
    games = games.filter(it => {
      let gameCompanies: string[] = []
      if (includeDevelopers) gameCompanies = gameCompanies.concat(it[1].developer.value)
      if (includePublishers) gameCompanies = gameCompanies.concat(it[1].publisher.value)
      return gameCompanies.includes(company)
    })
  }

  // hide unreleased games if necessary
  if (release === 'US') {
    games = games.filter(it => !(it[1].unreleased || []).includes(release))
  }

  // default sort is no-op
  if (sort === 'year') {
    games.sort((a, b) => {
      return getRelease(a[1], release) - getRelease(b[1], release)
    })
  }

  return (
    <div className="my-4">
      <form className="w-fit mx-auto rounded-xl bg-tertiary p-2 grid grid-cols-[max-content__auto] gap-2">
        <label className="font-bold">System:</label>
        <select className="bg-tertiary" value={system} onChange={e => setSystem(e.target.value)}>
          <option value="">Any</option>
          {allSystems.map(it => <option key={it} value={it}>{it}</option>)}
        </select>

        <label className="font-bold">Company:</label>
        <select className="bg-tertiary" value={company} onChange={e => setCompany(e.target.value)}>
          <option value="">Any</option>
          {allCompanies.map(it => <option key={it} value={it}>{it}</option>)}
        </select>

        <div className="col-span-2 text-center *:m-1">
          <input type="checkbox" checked={includeDevelopers} onChange={e => setIncludeDevelopers(e.target.checked)} />
          <label className="font-bold">Developer</label>

          <input type="checkbox" checked={includePublishers} onChange={e => setIncludePublishers(e.target.checked)} />
          <label className="font-bold">Publisher</label>
        </div>

        <label className="font-bold">Release:</label>
        <select className="bg-tertiary" value={release} onChange={e => setRelease(e.target.value)}>
          <option value="first">First</option>
          <option value="US">US</option>
          <option value="Original">Original</option>
        </select>

        <label className="font-bold">Sort:</label>
        <select className="bg-tertiary" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="year">Year</option>
        </select>
      </form>
      
      <table className="w-fit mx-auto text-nowrap">
        <thead>
          <tr className="*:p-4">
            <th>Name</th>
            <th>Year</th>
            <th className="max-[380px]:hidden">System</th>
            <th className="max-[525px]:hidden">Developer</th>
            <th className="max-[625px]:hidden">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {games.map(([slug, game]) => createGameRow(slug, game, release))}
        </tbody>
      </table>
    </div>
  )
}

function getRelease(game: GameInfo, release: string) {
  return (game.year.notes || {})[release] || game.year.value
}

function createGameRow(slug: string, game: GameInfo, release: string) {
  return (
    <tr key={slug} className="align-top odd:bg-black/10 *:p-4">
      <td><GameLink slug={slug}>{createList(game.title.value)}</GameLink></td>
      <td>{getRelease(game, release)}</td>
      <td className="max-[380px]:hidden">{createList(game.system.value)}</td>
      <td className="max-[525px]:hidden">{createList(game.developer.value)}</td>
      <td className="max-[625px]:hidden">{createList(game.publisher.value)}</td>
    </tr>
  )
}

function createList(values: string[]) {
  return <ul>{values.map((it, n) => <li key={n}>{it}</li>)}</ul>
}
