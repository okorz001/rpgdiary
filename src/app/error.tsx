'use client'

export default function ErrorPage() {
  return (
    <div className="w-full bg-red-500/40">
      <h2 className="p-4 text-3xl text-center">Error</h2>
      <img width="60" height="81" src="/assets/kefka.png" alt="Kefka angry" className="mx-auto" />
      <p className="w-fit py-4 mx-auto italic">
        Son of a submariner!
      </p>
    </div>
  )
}
