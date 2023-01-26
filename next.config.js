const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const linguiConfig = require('./lingui.config.js')
const defaultTheme = require('tailwindcss/defaultTheme')

const { ChainId } = require('@sushiswap/core-sdk')

const { locales, sourceLocale } = linguiConfig
const { screens } = defaultTheme

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        resourceQuery: /raw-lingui/,
        type: 'javascript/auto',
      },
    ]

    return config
  },
  // experimental: {
  //   concurrentFeatures: true,
  //   serverComponents: true,
  // },
  swcMinify: false,
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/sushi-cdn/image/fetch/',
    domains: [
      'assets.sushi.com',
      'res.cloudinary.com',
      'raw.githubusercontent.com',
      'logos.covalenthq.com',
      'api.gravityfinance.io',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/stake',
        destination: '/bar',
      },
      {
        source: '/add/:token*',
        destination: '/legacy/add/:token*',
      },
      {
        source: '/remove/:token*',
        destination: '/legacy/remove/:token*',
      },
      {
        source: '/create/:token*',
        destination: '/legacy/add/:token*',
      },
      {
        source: '/swap',
        destination: '/legacy/swap',
      },
      {
        source: '/swap/:token*',
        destination: '/legacy/swap/:token*',
      },
      {
        source: '/limit-order',
        destination: '/legacy/limit-order',
      },
      {
        source: '/limit-order/:token*',
        destination: '/legacy/limit-order/:token*',
      },
      {
        source: '/open-order',
        destination: '/legacy/open-order',
      },
      {
        source: '/pool',
        destination: '/legacy/pool',
      },
      {
        source: '/find',
        destination: '/legacy/find',
      },
      {
        source: '/migrate',
        destination: '/legacy/migrate',
      },
      // Kashi
      {
        source: '/me',
        destination: '/user',
      },
    ]
  },
  i18n: {
    localeDetection: true,
    locales,
    defaultLocale: sourceLocale,
  },
  network: {
    chainIds: [ChainId.SGB, ChainId.ARBITRUM],
    defaultChainId: ChainId.SGB,
    domains: [
      // {
      //   domain: 'sushi.com',
      //   defaultChainId: ChainId.ETHEREUM,
      // },
      // {
      //   domain: 'arbitrum.sushi.com',
      //   defaultChainId: ChainId.ARBITRUM,
      // },
    ],
  },
  publicRuntimeConfig: {
    breakpoints: screens,
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

}


const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(withPWA(withBundleAnalyzer(nextConfig)), SentryWebpackPluginOptions)

module.exports = withPWA(withBundleAnalyzer(nextConfig))
// Don't delete this console log, useful to see the config in Vercel deployments
// console.log('next.config.js', JSON.stringify(module.exports, null, 2))
