import { PropsWithChildren } from '@/components'
import Link from '@/components/Link'
import Note from '@/components/Note'

export type TranslationNoteProps = {
  name: string
  link: string
}

export default function TranslationNote(props: TranslationNoteProps) {
  var link = <Link href={props.link}>{props.name} translation hack</Link>
  return (
    <Note>
      This version was never officially released in the US, so I used the {link}.
      It is possible that this translation may have mistakes.
    </Note>
  )
}
