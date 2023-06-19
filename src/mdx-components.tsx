import type { MDXComponents } from 'mdx/types'

import { type PropsWithChildren } from '@/components'
import Article from '@/components/Article'
import Figure from '@/components/Figure'
import GameHeader from '@/components/GameHeader'
import GameLink from '@/components/GameLink'
import GameRanking from '@/components/GameRanking'
import { LikedDisliked, LikedList, LikedItem, DislikedList, DislikedItem } from '@/components/LikedDisliked'
import Link from '@/components/Link'
import Spoiler from '@/components/Spoiler'

function Paragraph(props: PropsWithChildren) {
  return <p className="my-4 indent-8 text-justify">{props.children}</p>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // MDX wrapper/layout
    wrapper: Article,

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

    // defaults
    ...components,
  }
}
