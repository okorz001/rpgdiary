'use client'

import { useArticleMeta } from '@/components/ArticleMetaProvider'
import Figure from '@/components/Figure'

export default function GameHeader() {
  const meta = useArticleMeta()
  if (!meta) {
    throw new Error('ArticleMeta is required')
  }

  // TODO: define type for data in game articles
  const { title, data } = meta
  if (!data) {
    return null
  }

  return (
    <div className="my-4 flex flex-wrap-reverse gap-4 justify-center items-center">
      <table className="border-separate border-spacing-2 rounded-xl bg-tertiary/30">
        <tbody>
          {createRows({ title, ...data })}
        </tbody>
      </table>
      {data.covers && (
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {data.covers.map((it, i) => (
            <Figure key={i} image={it.image} alt={`${title}: ${it.caption}`}>{it.caption}</Figure>
          ))}
        </div>
      )}
    </div>
  )
}

function createRows(data) {
  return ['Title', 'Year', 'System', 'Developer', 'Publisher'].map(label => {
    const key = label.toLowerCase()
    const value = data[key]
    if (!value) {
      return null
    }

    const detailsKey = `${key}Notes`
    const detailsValue = data[detailsKey]

    return (
      <tr key={key}>
        <td className="align-top font-bold">{label}</td>
        <td className="align-top whitespace-pre">
          {value}
          {detailsValue ? <><br /><span className="text-xs">({detailsValue})</span></> : null}
        </td>
      </tr>
    )
  })
}
