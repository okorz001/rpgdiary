import Link from '@/components/Link'

export type PageNavProps = {
  className?: string
  page: number
  count: number
  getHref: (page: number) => string,
}

export default function PageNav(props: PageNavProps) {
  const { className, page, count, getHref } = props
  const createLink = (to: number, label: string) => {
    let inner: JSX.Element
    if (to >= 1 && to <= count && to != page) {
      inner = <Link href={getHref(to)}>{label}</Link>
    } else {
      inner = <span className="text-text/30">{label}</span>
    }
    return <div className="text-xl -my-1">{inner}</div>
  }
  const nav = (
    <nav className={`p-2 flex justify-center *:px-2 *:text-nowrap ${className}`}>
      {createLink(1, '<<')}
      {createLink(page - 1, '<')}
      <div className="text-sm">Page {page} of {count}</div>
      {createLink(page + 1, '>')}
      {createLink(count, '>>')}
    </nav>
  )
  // The sticky bottom nav doesn't account for disappearing browser UI during scrolling, which breaks the illusion of
  // sticking to the bottom of the viewport. For some reason adding a fixed element after the nav stops this behavior.
  // https://www.stevefenton.co.uk/blog/2022/12/mobile-position-sticky-issue/
  return <>{nav}<div className="fixed" /></>
}
