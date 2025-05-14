import { type Metadata } from 'next'

import GamesTable from '@/components/GamesTable'
import Paper from '@/components/Paper'

export const metadata: Metadata = {
  title: 'Games',
  description: 'List of played games',
}

export default function GamesPage() {
  return <Paper><GamesTable /></Paper>
}
