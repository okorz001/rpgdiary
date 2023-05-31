import { PropsWithChildren } from '@/components'
import Link from '@/components/Link'
import { useRanking } from '@/components/RankingProvider'

type GameLinkProps = PropsWithChildren & {
  slug: string
}

export default function GameLink(props: GameLinkProps) {
  const ranking = useRanking()
  const game = ranking.find(it => it.slug == props.slug)
  if (!game) {
    throw new Error(`Unknown slug: ${props.slug}`)
  }
  const label = props.children || <>{game.title}</>
  return <Link href={`/games/${props.slug}`}>{label}</Link>
}
