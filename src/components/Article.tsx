'use client'

import { MDXRemote } from 'next-mdx-remote'

import { PropsWithChildren } from '@/components'
import ArticleMetaProvider from '@/components/ArticleMetaProvider'
import Figure from '@/components/Figure'
import GameHeader from '@/components/GameHeader'
import GameLink from '@/components/GameLink'
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
  GameLink,
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
  const date = props.meta.date && renderDate(props.meta.date)
  return (
    <article className="px-2 py-2">
      {date && <div className="mb-1 text-xs">{date}</div>}
      <h2 className="text-3xl text-center font-serif">{props.meta.title}</h2>
      <ArticleMetaProvider meta={props.meta}>
        <MDXRemote components={components} {...props.mdxProps} />
      </ArticleMetaProvider>
    </article>
  )
}

function renderDate(date: string) {
  // new Date uses UTC midnight when parsing a ISO date, which can make the date wrong in local timezone
  //   > new Date('2023-05-06')
  //   2023-05-06T00:00:00.000Z
  // However, explicitly passing year, month, and date uses local midnight which is always right in local timezone
  //   > new Date(2023, 5, 6)
  //   2023-06-06T07:00:00.000Z
  const [match, year, month, day] = /^(\d+)-(\d+)-(\d+)$/.exec(date) || []
  if (match) {
    // Date months are [0, 11]
    return new Date(+year, +month - 1, +day)
      .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } else {
    console.warn(`Invalid date: ${date}`)
  }
}
