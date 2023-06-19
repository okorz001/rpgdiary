import Figure from '@/components/Figure'
import { getGameName, type Annotated, type GameInfo } from '@/lib/games'

type GameHeaderProps = {
  game: GameInfo
}

export default function GameHeader(props: GameHeaderProps) {
  const name = getGameName(props.game)
  return (
    <div className="my-4 flex flex-wrap-reverse gap-4 justify-center items-center">
      <table className="border-separate border-spacing-2 rounded-xl bg-tertiary">
        <tbody>
          {renderRow('Title', props.game.title)}
          {renderRow('Year', props.game.year)}
          {renderRow('System', props.game.system)}
          {renderRow('Developer', props.game.developer)}
          {renderRow('Publisher', props.game.publisher)}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {props.game.covers.map((it, i) => (
          <Figure key={i} image={it.image} alt={`${name}: ${it.caption}`}>{it.caption}</Figure>
        ))}
      </div>
    </div>
  )
}

// TODO: this works but could probably be a little cleaner...
function renderRow(label: string, item: Annotated) {
  const notes = item.notes || {}
  return (
    <tr>
      <td className="align-top font-bold">{label}</td>
      <td className="align-top">
        <>
          <ul>
            {toArray(item.value).map((it, index) => {
              return <li key={index}>{it}</li>
            })}
          </ul>
          {Object.keys(notes).map(key => (
            <div key={key} className="text-xs">
              {'('}
              {key}
              <ul className="inline">
                {toArray(notes[key]).map((it, index) => {
                  return <li key={index} className="inline first:before:content-[':_'] before:content-[',_']">{it}</li>
                })}
              </ul>
              {')'}
            </div>
          ))}
        </>
      </td>
    </tr>
  )
}

function toArray<T>(value: T): T[]
function toArray<T>(value: T[]): T[]
function toArray(value) {
  return Array.isArray(value) ? value : [value]
}
