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
      <ul className="ps-6">{props.children}</ul>
    </div>
  ))
}

export const LikedList = createList('LikedList', 'Liked')
export const DislikedList = createList('DislikedList', 'Disliked')

function createItem(name: string, imageUrl: string) {
  return createComponent(name, (props: PropsWithChildren) => (
    <li className="my-1">
      <div className="absolute">
        <img src={imageUrl} className="relative right-6 w-6" />
      </div>
      {props.children}
    </li>
  ))
}

export const LikedItem = createItem('LikedItem', '/assets/thumbs-up.svg')
export const DislikedItem = createItem('DislikedItem', '/assets/thumbs-down.svg')
