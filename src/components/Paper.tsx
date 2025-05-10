
import { PropsWithChildren } from '@/components'

export type PaperProps = PropsWithChildren & {
  colorClassName?: string
}

export default function Paper(props: PaperProps) {
  const { children, colorClassName } = props
  return <div className={`w-full max-w-[768px] h-fit ${colorClassName || 'bg-paper'} rounded-3xl`}>{children}</div>
}
