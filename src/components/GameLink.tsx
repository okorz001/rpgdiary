import { useContext } from 'react'

import { PropsWithChildren } from '@/components'
import Link from '@/components/Link'
import { RankingContext } from '@/components/RankingContext'

type GameLinkProps = PropsWithChildren & {
  slug: string
}

export default function GameLink(props: GameLinkProps) {
  const ranking = useContext(RankingContext)
  const game = ranking.find(it => it.slug == props.slug)
  if (!game) {
    throw new Error(`Unknown slug: ${props.slug}`)
  }
  const label = props.children || <>{game.title}</>
  return <Link href={`/games/${props.slug}`}>{label}</Link>
}
