import type { MDXComponents } from 'mdx/types'

import { type PropsWithChildren } from '@/components'
import Article from '@/components/Article'
import Figure from '@/components/Figure'
import GameHeader from '@/components/GameHeader'
import GameLink from '@/components/GameLink'
import GameRanking from '@/components/GameRanking'
import { LikedDisliked, LikedList, LikedItem, DislikedList, DislikedItem } from '@/components/LikedDisliked'
import Link from '@/components/Link'
import Note from '@/components/Note'
import Spoiler from '@/components/Spoiler'
import TranslationNote from '@/components/TranslationNote'

function Paragraph(props: PropsWithChildren) {
  return <p className="my-4 text-justify">{props.children}</p>
}

// the nav bar uses <h1>
// the article title uses <h2>
// thus, markdown content should start with <h3>
function Header(props: PropsWithChildren) {
  return <h3 className="my-4 font-serif text-xl text-center">{props.children}</h3>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // MDX wrapper/layout
    wrapper: Article,

    // override styles
    a: Link,
    p: Paragraph,
    h1: Header,

    // custom components
    Figure,
    GameHeader,
    GameLink,
    GameRanking,
    Note,
    Spoiler,
    TranslationNote,

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
