import { createComponent, PropsWithChildren } from '@/components'

export function LikedDisliked(props: PropsWithChildren) {
  return (
    <div className="m-4 grid grid-cols-liked1 sm:grid-cols-liked2 gap-4 justify-evenly">
      {props.children}
    </div>
  )
}

function createList(name: string,  title: string) {
  return createComponent(name, (props: PropsWithChildren) => (
    <div className="p-2 rounded-xl bg-tertiary">
      <div className="font-bold text-lg text-center">{title}</div>
      <ul className="grid grid-cols-list gap-2">{props.children}</ul>
    </div>
  ))
}

export const LikedList = createList('LikedList', 'Liked')
export const DislikedList = createList('DislikedList', 'Disliked')

function createItem(name: string, marker: string) {
  return createComponent(name, (props: PropsWithChildren) => (
    <li className="contents">
      <span className="text-right">{marker}</span>
      <span>{props.children}</span>
    </li>
  ))
}

export const LikedItem = createItem('LikedItem', '👍')
export const DislikedItem = createItem('DislikedItem', '👎')
