import LatestPage, { getStaticProps as getLatestPageProps } from './page/[page]'

// This is effectively a rewrite rule so that "/"" has the same contents as "/page/1".
// Doing it this way still allows static HTML export without any janky redirects.

export default LatestPage

export function getStaticProps() {
  const params = { page: '1' }
  return getLatestPageProps({ params })
}
