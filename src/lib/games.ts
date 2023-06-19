import { type ReactElement } from 'react'

import * as articles from '../../data/articles'

export type GameInfo = {
  name?: string
  title: Annotated<string[]>
  year: Annotated<number>
  system: Annotated<string[]>
  developer: Annotated<string[]>
  publisher: Annotated<string[]>
  covers: Cover[]
}

export type Annotated<T = any> = {
  value: T
  notes?: Record<string, T>
}

export type Cover = {
  caption: string
  image: string
}

export function getGameSlugs(): string[] {
  return Object.keys(GAMES)
}

export function getGameInfo(slug: string): GameInfo {
  return GAMES[slug] || (() => { throw new Error(`No game for slug: ${slug}`) })
}

export function getGameInfos(): Record<string, GameInfo> {
  return GAMES
}

export function getGameName(game: GameInfo): string {
  return game.name || game.title.value[0]
}

export type GameRanking = {
  slug: string
  date: string
}

export function getGameRanking(): GameRanking[] {
  return RANKING
}

export type GameArticleProps = {
  slug: string
  title: string
  date?: string
  game: GameInfo
}

export type GameArticle = (props: GameArticleProps) => ReactElement

export function getGameArticle(slug: string): GameArticle {
  return articles[slug] || (() => { throw new Error(`No article for slug: ${slug}`) })
}

// just define all data below as constants
// this avoids I/O and parsing plus it leverages TS type checking

const RANKING: GameRanking[] = [
  { slug: 'final_fantasy_v', date: '2022-07-14' },
  { slug: 'final_fantasy_x', date: '2023-01-11' },
  { slug: 'final_fantasy_ix', date: '2022-12-18' },
  { slug: 'final_fantasy_vii', date: '2022-10-14' },
  { slug: 'final_fantasy_vi', date: '2022-09-02' },
  { slug: 'final_fantasy_xiii_2', date: '2023-06-03' },
  { slug: 'final_fantasy_iv', date: '2022-06-27' },
  { slug: 'final_fantasy_iii', date: '2022-06-21' },
  { slug: 'final_fantasy_xii', date: '2023-04-02' },
  { slug: 'pokemon_scarlet_and_violet', date: '2023-01-24' },
  { slug: 'final_fantasy_xiii', date: '2023-05-06' },
  { slug: 'final_fantasy_viii', date: '2022-11-11' },
  { slug: 'final_fantasy_ii', date: '2022-06-14' },
  { slug: 'final_fantasy', date: '2022-06-03' },
  { slug: 'final_fantasy_x_2', date: '2023-02-12' },
]

const GAMES: Record<string, GameInfo> = {
  final_fantasy: {
    title: { value: ['Final Fantasy'] },
    year: { value: 1987, notes: { US: 1990 } },
    system: { value: ['NES'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'], notes: { US: ['Nintendo'] } },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy/cover-jp.jpg' },
    ],
  },

  final_fantasy_ii: {
    title: { value: ['Final Fantasy\xA0II'] },
    year: { value: 1988 },
    system: { value: ['NES'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'Japan Cover', image: 'final_fantasy_ii/cover-jp.jpg' },
    ],
  },

  final_fantasy_iii: {
    title: { value: ['Final Fantasy\xA0III'] },
    year: { value: 1990 },
    system: { value: ['NES'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'Japan Cover', image: 'final_fantasy_iii/cover-jp.jpg' },
    ],
  },

  final_fantasy_iv: {
    title: { value: ['Final Fantasy\xA0IV'], notes: { US: ['Final Fantasy\xA0II'] } },
    year: { value: 1991 },
    system: { value: ['SNES'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_iv/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_iv/cover-jp.jpg' },
    ],
  },

  final_fantasy_v: {
    title: { value: ['Final Fantasy\xA0V'] },
    year: { value: 1992 },
    system: { value: ['SNES'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'Japan Cover', image: 'final_fantasy_v/cover-jp.jpg' },
    ],
  },

  final_fantasy_vi: {
    title: { value: ['Final Fantasy\xA0VI'], notes: { US: ['Final Fantasy\xA0III'] } },
    year: { value: 1994 },
    system: { value: ['SNES'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_vi/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_vi/cover-jp.jpg' },
    ],
  },

  final_fantasy_vii: {
    title: { value: ['Final Fantasy\xA0VII'] },
    year: { value: 1997 },
    system: { value: ['PlayStation'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'], notes: { US: ['Sony'] } },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_vii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_vii/cover-jp.jpg' },
    ],
  },

  final_fantasy_viii: {
    title: { value: ['Final Fantasy\xA0VIII'] },
    year: { value: 1999 },
    system: { value: ['PlayStation'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_viii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_viii/cover-jp.jpg' },
    ],
  },

  final_fantasy_ix: {
    title: { value: ['Final Fantasy\xA0IX'] },
    year: { value: 2000 },
    system: { value: ['PlayStation'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_ix/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_ix/cover-jp.jpg' },
    ],
  },

  final_fantasy_x: {
    title: { value: ['Final Fantasy\xA0X'] },
    year: { value: 2001 },
    system: { value: ['PS2'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_x/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_x/cover-jp.jpg' },
    ],
  },

  final_fantasy_x_2: {
    title: { value: ['Final Fantasy\xA0X-2'] },
    year: { value: 2003 },
    system: { value: ['PS2'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_x_2/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_x_2/cover-jp.jpg' },
    ],
  },

  final_fantasy_xii: {
    title: { value: ['Final Fantasy\xA0XII'] },
    year: { value: 2006 },
    system: { value: ['PS2'] },
    developer: { value: ['Square Enix'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_xii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_xii/cover-jp.jpg' },
    ],
  },

  final_fantasy_xiii: {
    title: { value: ['Final Fantasy\xA0XIII'] },
    year: { value: 2009, notes: { US: 2010 } },
    system: { value: ['PS3', 'Xbox 360'] },
    developer: { value: ['Square Enix'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_xiii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_xiii/cover-jp.jpg' },
    ],
  },

  final_fantasy_xiii_2: {
    title: { value: ['Final Fantasy\xA0XIII-2'] },
    year: { value: 2011, notes: { US: 2012 } },
    system: { value: ['PS3', 'Xbox 360'] },
    developer: { value: ['Square Enix', 'tri-Ace'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_xiii_2/cover-us.png' },
      { caption: 'Japan Cover', image: 'final_fantasy_xiii_2/cover-jp.jpg' },
    ],
  },

  pokemon_scarlet_and_violet: {
    name: 'Pokemon Scarlet and Violet',
    title: { value: ['Pokemon Scarlet', 'Pokemon Violet'] },
    year: { value: 2022 },
    system: { value: ['Switch'] },
    developer: { value: ['Game Freak'] },
    publisher: { value: ['Nintendo'] },
    covers: [
      { caption: 'Pokemon Scarlet', image: 'pokemon_scarlet_and_violet/cover-scarlet.jpg' },
      { caption: 'Pokemon Violet', image: 'pokemon_scarlet_and_violet/cover-violet.jpg' },
    ],
  },
}
