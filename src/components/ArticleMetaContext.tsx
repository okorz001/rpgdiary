'use client'

import { createContext } from 'react'

import { type ArticleMeta } from '@/lib/articles'

export const ArticleMetaContext = createContext<ArticleMeta | undefined>(undefined)
