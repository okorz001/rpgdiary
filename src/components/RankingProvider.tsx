'use client'

import { createContext, useContext } from 'react'

import { type PropsWithChildren } from '@/components'
import { type ArticleMeta } from '@/lib/articles'

const RankingContext = createContext<ArticleMeta[]>([])

type RankingProviderProps = PropsWithChildren & {
  ranking: ArticleMeta[]
}

export default function RankingProvider(props: RankingProviderProps) {
  return (
    <RankingContext.Provider value={props.ranking}>
      {props.children}
    </RankingContext.Provider>
  )
}

export function useRanking() {
  return useContext(RankingContext)
}
