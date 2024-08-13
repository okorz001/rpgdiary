import { type ReactElement } from 'react'

import * as articles from '../../data/articles'

export type GameInfo = {
  name?: string
  title: Annotated<string[]>
  year: Annotated<number>
  unreleased?: string[]
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

// could eventually define these separately with more data
export function getSystems(): string[] {
  const o = {}
  Object.values(GAMES).forEach(game => game.system.value.forEach(it => o[it] = 1))
  return Object.keys(o).sort()
}

// could eventually define these separately with more data
export function getCompanies(): string[] {
  const o = {}
  Object.values(GAMES).forEach(game => {
    game.developer.value.forEach(it => o[it] = 1)
    game.publisher.value.forEach(it => o[it] = 1)
  })
  return Object.keys(o).sort()
}

// just define all data below as constants
// this avoids I/O and parsing plus it leverages TS type checking

const RANKING: GameRanking[] = [
  { slug: 'chrono_trigger', date: '2024-05-26' },
  { slug: 'final_fantasy_v', date: '2022-07-14' },
  { slug: 'final_fantasy_x', date: '2023-01-11' },
  { slug: 'final_fantasy_ix', date: '2022-12-18' },
  { slug: 'final_fantasy_vii', date: '2022-10-14' },
  { slug: 'final_fantasy_xv', date: '2023-08-10' },
  { slug: 'dragon_quest_viii', date: '2024-02-10' },
  { slug: 'final_fantasy_vi', date: '2022-09-02' },
  { slug: 'final_fantasy_xiii_2', date: '2023-06-03' },
  { slug: 'final_fantasy_iv', date: '2022-06-27' },
  { slug: 'final_fantasy_xvi', date: '2024-01-13' },
  { slug: 'final_fantasy_iii', date: '2022-06-21' },
  { slug: 'dragon_quest_iv', date: '2023-09-23' },
  { slug: 'final_fantasy_xii', date: '2023-04-02' },
  { slug: 'dragon_quest_xi_s', date: '2024-04-20' },
  { slug: 'pokemon_scarlet_and_violet', date: '2023-01-24' },
  { slug: 'dragon_quest_v', date: '2023-10-01' },
  { slug: 'dragon_quest_vi', date: '2023-10-17' },
  { slug: 'dragon_quest_iii', date: '2023-09-12' },
  { slug: 'final_fantasy_xiii', date: '2023-05-06' },
  { slug: 'final_fantasy_viii', date: '2022-11-11' },
  { slug: 'chrono_cross', date: '2024-06-25' },
  { slug: 'final_fantasy_ii', date: '2022-06-14' },
  { slug: 'phantasy_star', date: '2024-07-04' },
  { slug: 'dragon_quest_ii', date: '2023-08-28' },
  { slug: 'final_fantasy', date: '2022-06-03' },
  { slug: 'phantasy_star_iii', date: '2024-08-12' },
  { slug: 'dragon_quest_vii', date: '2023-11-29' },
  { slug: 'lightning_returns', date: '2023-07-10' },
  { slug: 'final_fantasy_x_2', date: '2023-02-12' },
  { slug: 'dragon_quest_ix', date: '2024-03-23' },
  { slug: 'phantasy_star_ii', date: '2024-07-22' },
  { slug: 'dragon_quest', date: '2023-08-21' },
]

const GAMES: Record<string, GameInfo> = {
  chrono_trigger: {
    title: { value: ['Chrono Trigger'] },
    year: { value: 1995 },
    system: { value: ['SNES'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'chrono_trigger/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'chrono_trigger/cover-jp.jpg' },
    ],
  },

  chrono_cross: {
    title: { value: ['Chrono Cross'] },
    year: { value: 1999, notes: { US: 2000 } },
    system: { value: ['PSX'] },
    developer: { value: ['Square'] },
    publisher: { value: ['Square'] },
    covers: [
      { caption: 'US Cover', image: 'chrono_cross/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'chrono_cross/cover-jp.jpg' },
    ],
  },

  dragon_quest: {
    title: { value: ['Dragon Quest'], notes: { US: ['Dragon Warrior'] } },
    year: { value: 1986, notes: { US: 1989 } },
    system: { value: ['NES'] },
    developer: { value: ['Chunsoft'] },
    publisher: { value: ['Enix'], notes: { US: ['Nintendo'] } },
    covers: [
      { caption: 'US Cover', image: 'dragon_quest/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'dragon_quest/cover-jp.jpg' },
    ],
  },

  dragon_quest_ii: {
    title: { value: ['Dragon Quest\xA0II'], notes: { US: ['Dragon Warrior\xA0II'] } },
    year: { value: 1987, notes: { US: 1990 } },
    system: { value: ['NES'] },
    developer: { value: ['Chunsoft'] },
    publisher: { value: ['Enix'] },
    covers: [
      { caption: 'US Cover', image: 'dragon_quest_ii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'dragon_quest_ii/cover-jp.jpg' },
    ],
  },

  dragon_quest_iii: {
    title: { value: ['Dragon Quest\xA0III'], notes: { US: ['Dragon Warrior\xA0III'] } },
    year: { value: 1988, notes: { US: 1992 } },
    system: { value: ['NES'] },
    developer: { value: ['Chunsoft'] },
    publisher: { value: ['Enix'] },
    covers: [
      { caption: 'US Cover', image: 'dragon_quest_iii/cover-us.png' },
      { caption: 'Japan Cover', image: 'dragon_quest_iii/cover-jp.jpg' },
    ],
  },

  dragon_quest_iv: {
    title: { value: ['Dragon Quest\xA0IV'], notes: { US: ['Dragon Warrior\xA0IV'] } },
    year: { value: 1990, notes: { US: 1992 } },
    system: { value: ['NES'] },
    developer: { value: ['Chunsoft'] },
    publisher: { value: ['Enix'] },
    covers: [
      { caption: 'US Cover', image: 'dragon_quest_iv/cover-us.png' },
      { caption: 'Japan Cover', image: 'dragon_quest_iv/cover-jp.png' },
    ],
  },

  dragon_quest_v: {
    title: { value: ['Dragon Quest\xA0V'] },
    year: { value: 1992 },
    unreleased: ['US'],
    system: { value: ['SNES'] },
    developer: { value: ['Chunsoft'] },
    publisher: { value: ['Enix'] },
    covers: [
      { caption: 'Japan Cover', image: 'dragon_quest_v/cover-jp.jpg' },
    ],
  },

  dragon_quest_vi: {
    title: { value: ['Dragon Quest\xA0VI'] },
    year: { value: 1995 },
    unreleased: ['US'],
    system: { value: ['SNES'] },
    developer: { value: ['Heart Beat'] },
    publisher: { value: ['Enix'] },
    covers: [
      { caption: 'Japan Cover', image: 'dragon_quest_vi/cover-jp.jpg' },
    ],
  },

  dragon_quest_vii: {
    title: { value: ['Dragon Quest\xA0VII'], notes: { US: ['Dragon Warrior\xA0VII'] } },
    year: { value: 2000, notes: { US: 2001 } },
    system: { value: ['PSX'] },
    developer: { value: ['Heart Beat'] },
    publisher: { value: ['Enix'] },
    covers: [
      { caption: 'US Cover', image: 'dragon_quest_vii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'dragon_quest_vii/cover-jp.jpg' },
    ],
  },

  dragon_quest_viii: {
    title: { value: ['Dragon Quest\xA0VIII'] },
    year: { value: 2004, notes: { US: 2005 } },
    system: { value: ['PS2'] },
    developer: { value: ['Level-5'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'dragon_quest_viii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'dragon_quest_viii/cover-jp.jpg' },
    ],
  },

  dragon_quest_ix: {
    title: { value: ['Dragon Quest\xA0IX'] },
    year: { value: 2009, notes: { US: 2010 } },
    system: { value: ['DS'] },
    developer: { value: ['Level-5', 'Square Enix'] },
    publisher: { value: ['Square Enix'], notes: { US: ['Nintendo'] } },
    covers: [
      { caption: 'US Cover', image: 'dragon_quest_ix/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'dragon_quest_ix/cover-jp.jpg' },
    ],
  },

  dragon_quest_xi_s: {
    title: { value: ['Dragon Quest\xA0XI\xA0S'] },
    year: { value: 2019, notes: { Original: 2017 } },
    system: { value: ['NS', 'PS4', 'XB1', 'WIN'] },
    developer: { value: ['Square Enix'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'Switch Cover', image: 'dragon_quest_xi_s/cover-switch.jpg' },
      { caption: 'PS4 Cover', image: 'dragon_quest_xi_s/cover-ps4.png' },
    ],
  },

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
    unreleased: ['US'],
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
    unreleased: ['US'],
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
    unreleased: ['US'],
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
    system: { value: ['PSX'] },
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
    system: { value: ['PSX'] },
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
    system: { value: ['PSX'] },
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
    system: { value: ['PS3', '360'] },
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
    system: { value: ['PS3', '360'] },
    developer: { value: ['Square Enix'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_xiii_2/cover-us.png' },
      { caption: 'Japan Cover', image: 'final_fantasy_xiii_2/cover-jp.jpg' },
    ],
  },

  lightning_returns: {
    title: { value: ['Lightning Returns'] },
    year: { value: 2013, notes: { US: 2014 } },
    system: { value: ['PS3', '360'] },
    developer: { value: ['Square Enix'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'lightning_returns/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'lightning_returns/cover-jp.jpg' },
    ],
  },

  final_fantasy_xv: {
    title: { value: ['Final Fantasy\xA0XV'] },
    year: { value: 2016 },
    system: { value: ['PS4', 'XB1', 'WIN'] },
    developer: { value: ['Square Enix'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_xv/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_xv/cover-jp.jpg' },
    ],
  },

  final_fantasy_xvi: {
    title: { value: ['Final Fantasy\xA0XVI'] },
    year: { value: 2023 },
    system: { value: ['PS5'] },
    developer: { value: ['Square Enix'] },
    publisher: { value: ['Square Enix'] },
    covers: [
      { caption: 'US Cover', image: 'final_fantasy_xvi/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'final_fantasy_xvi/cover-jp.jpg' },
    ],
  },

  phantasy_star: {
    title: { value: ['Phantasy Star'] },
    year: { value: 1987, notes: { US: 1988 } },
    system: { value: ['SMS'] },
    developer: { value: ['Sega'] },
    publisher: { value: ['Sega'] },
    covers: [
      { caption: 'US Cover', image: 'phantasy_star/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'phantasy_star/cover-jp.jpg' },
    ],
  },

  phantasy_star_ii: {
    title: { value: ['Phantasy Star\xA0II'] },
    year: { value: 1989, notes: { US: 1990 } },
    system: { value: ['GEN'] },
    developer: { value: ['Sega'] },
    publisher: { value: ['Sega'] },
    covers: [
      { caption: 'US Cover', image: 'phantasy_star_ii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'phantasy_star_ii/cover-jp.jpg' },
    ],
  },

  phantasy_star_iii: {
    title: { value: ['Phantasy Star\xA0III'] },
    year: { value: 1990, notes: { US: 1991 } },
    system: { value: ['GEN'] },
    developer: { value: ['Sega'] },
    publisher: { value: ['Sega'] },
    covers: [
      { caption: 'US Cover', image: 'phantasy_star_iii/cover-us.jpg' },
      { caption: 'Japan Cover', image: 'phantasy_star_iii/cover-jp.jpg' },
    ],
  },

  pokemon_scarlet_and_violet: {
    name: 'Pokemon Scarlet and Violet',
    title: { value: ['Pokemon Scarlet', 'Pokemon Violet'] },
    year: { value: 2022 },
    system: { value: ['NS'] },
    developer: { value: ['Game Freak'] },
    publisher: { value: ['Nintendo'] },
    covers: [
      { caption: 'Pokemon Scarlet', image: 'pokemon_scarlet_and_violet/cover-scarlet.jpg' },
      { caption: 'Pokemon Violet', image: 'pokemon_scarlet_and_violet/cover-violet.jpg' },
    ],
  },
}
