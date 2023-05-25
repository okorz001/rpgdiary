import LatestPage from '@/app/pages/[page]/page'
import Redirect from '@/components/Redirect'

// "/" is used instead of "/pages/1", so redirect there.
// The full page is still rendered to prevent jank on redirect.

export default async function RedirectPage() {
  const params = { page: '1' }
  const page = await LatestPage({ params })
  return (
    <>
      <Redirect path="/" />
      {page}
    </>
  )
}
