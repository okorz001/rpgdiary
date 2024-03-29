import { PropsWithChildren } from '@/components'

export default function Note(props: PropsWithChildren) {
  return (
    <div className="my-4 w-fit mx-auto rounded-xl bg-yellow-300/20 p-2 text-justify">
      {props.children}
    </div>
  )
}
