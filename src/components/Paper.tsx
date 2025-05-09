
import { PropsWithChildren, PropsWithStyle } from '@/components'

export type PaperProps = PropsWithChildren & PropsWithStyle

export default function Paper(props: PaperProps) {
  const { children, className } = props
  return <div className={`w-full max-w-[768px] bg-paper rounded-xl ${className}`}>{children}</div>
}
