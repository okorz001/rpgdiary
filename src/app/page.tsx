import LatestPage from '@/app/pages/[page]/page'

// This is effectively a rewrite rule so that "/"" has the same contents as "/pages/1".
// Doing it this way still allows static HTML export without any janky redirects.

export default function IndexPage() {
  const params = { page: '1' }
  return LatestPage({ params })
}
