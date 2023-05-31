'use client'

import { createContext, useContext } from 'react'

import { PropsWithChildren } from '@/components'
import { type ArticleMeta } from '@/lib/articles'

const ArticleMetaContext = createContext<ArticleMeta | undefined>(undefined)

type ArticleMetaProviderProps = PropsWithChildren & {
  meta: ArticleMeta
}

export default function ArticleMetaProvider(props: ArticleMetaProviderProps) {
  return (
    <ArticleMetaContext.Provider value={props.meta}>
      {props.children}
    </ArticleMetaContext.Provider>
  )
}

export function useArticleMeta() {
  return useContext(ArticleMetaContext)
}
