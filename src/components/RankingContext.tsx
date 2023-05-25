'use client'

import { createContext } from 'react'

import { type PropsWithChildren } from '@/components'
import { type ArticleMeta } from '@/lib/articles'

export type RankingContextType = ArticleMeta[]

export const RankingContext = createContext<RankingContextType>([])

type RankingProviderProps = PropsWithChildren & {
  ranking: RankingContextType
}

export function RankingContextProvider(props: RankingProviderProps) {
  return (
    <RankingContext.Provider value={props.ranking}>
      {props.children}
    </RankingContext.Provider>
  )
}
