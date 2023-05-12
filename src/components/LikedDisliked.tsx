import { createComponent, PropsWithChildren } from '@/components'

export function LikedDisliked(props: PropsWithChildren) {
  return (
    <div className="flex justify-evenly flex-col sm:flex-row -my-4">
      {props.children}
    </div>
  )
}

function createList(name: string,  title: string) {
  return createComponent(name, (props: PropsWithChildren) => (
    <div className="w-[90%] xs:w-[80%] sm:w-[40%] mx-auto my-2 inline-block">
      <div className="font-bold text-lg text-center">{title}</div>
      <ul className="grid grid-cols-list gap-2 justify-center ">{props.children}</ul>
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
