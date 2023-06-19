// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
}

const withMdx = require('@next/mdx')()

module.exports = withMdx(nextConfig)
