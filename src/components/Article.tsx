import { type PropsWithChildren } from '@/components'

type ArticleProps = PropsWithChildren & {
  title: string
  date?: string
}

export default function Article(props: ArticleProps) {
  const date = props.date && renderDate(props.date)
  return (
    <article className="px-2 py-2">
      {date && <div className="mb-1 text-xs">{date}</div>}
      <h2 className="text-3xl text-center font-serif">{props.title}</h2>
      {props.children}
    </article>
  )
}

function renderDate(date: string) {
  // new Date uses UTC midnight when parsing a ISO date, which can make the date wrong in local timezone
  //   > new Date('2023-05-06')
  //   2023-05-06T00:00:00.000Z
  // However, explicitly passing year, month, and date uses local midnight which is always right in local timezone
  //   > new Date(2023, 5, 6)
  //   2023-06-06T07:00:00.000Z
  const [match, year, month, day] = /^(\d+)-(\d+)-(\d+)$/.exec(date) || []
  if (match) {
    // Date months are [0, 11]
    return new Date(+year, +month - 1, +day)
      .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } else {
    console.warn(`Invalid date: ${date}`)
  }
}
