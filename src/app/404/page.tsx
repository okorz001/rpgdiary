// see: https://github.com/vercel/next.js/issues/48227
// next.js is not compilling not-found into 404.html, so add an explicit 404 page as a workaround
export { default } from '@/app/not-found'
