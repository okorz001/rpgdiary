import Paper from '@/components/Paper'

export default function NotFoundPage() {
  return (
    <Paper error>
      <h2 className="p-4 text-3xl text-center">Page Not Found</h2>
      <img width="32" height="74" src="/images/gaspar.png/full.webp" alt="Old Man Gaspar" className="mx-auto" />
      <p className="w-fit py-4 mx-auto italic">
        Why, this is &quot;The End of Time,&quot; of course!<br/>
        <br/>
        All lost travelers in time wind up here!<br/>
        Now, where are you from?
      </p>
    </Paper>
  )
}
