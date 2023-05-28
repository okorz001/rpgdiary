'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'

import { PropsWithChildren } from '@/components'
import { ArticleMetaContext } from '@/components/ArticleMetaContext'
import Figure from '@/components/Figure'
import GameHeader from '@/components/GameHeader'
import GameRanking from '@/components/GameRanking'
import { LikedDisliked, LikedList, LikedItem, DislikedList, DislikedItem } from '@/components/LikedDisliked'
import Link from '@/components/Link'
import Spoiler from '@/components/Spoiler'
import { ArticleData } from '@/lib/articles'

function Paragraph(props: PropsWithChildren) {
  return (<p className="my-4 indent-8 text-justify">{props.children}</p>)
}

const components = {
  // override styles
  a: Link,
  p: Paragraph,
  // custom components
  Figure,
  GameHeader,
  GameRanking,
  Spoiler,
  // liked/disliked lists
  LikedDisliked,
  LikedList,
  LikedItem,
  DislikedList,
  DislikedItem,
}

export default function Article(props: ArticleData) {
  return (
    <article className="px-2 py-2">
      {props.meta.date && <div className="mb-1 text-xs">{props.meta.date}</div>}
      <h2 className="text-3xl text-center font-serif">{props.meta.title}</h2>
      <ArticleMetaContext.Provider value={props.meta}>
        <MDXRemote components={components} {...props.mdxProps} />
      </ArticleMetaContext.Provider>
    </article>
  )
}
