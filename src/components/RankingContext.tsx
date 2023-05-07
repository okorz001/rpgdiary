import { createContext } from 'react'

import { type ArticleMeta } from '@/lib/articles'

export type RankingContextType = ArticleMeta[]

export const RankingContext = createContext<RankingContextType>([])
