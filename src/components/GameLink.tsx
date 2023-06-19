import { PropsWithChildren } from '@/components'
import Link from '@/components/Link'
import { getGameName, getGameInfo } from '@/lib/games'

type GameLinkProps = PropsWithChildren & {
  slug: string
}

export default function GameLink(props: GameLinkProps) {
  const game = getGameInfo(props.slug)
  const label = props.children || <>{getGameName(game)}</>
  return <Link href={`/games/${props.slug}`}>{label}</Link>
}
