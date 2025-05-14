import { PropsWithChildren } from '@/components'

export type PaperProps = PropsWithChildren & {
  error?: boolean
}

export default function Paper(props: PaperProps) {
  const { children, error } = props
  const color = error ? 'bg-red-500/40' : 'bg-paper'
  return <div className={`w-full max-w-[768px] h-fit ${color} rounded-3xl`}>{children}</div>
}
