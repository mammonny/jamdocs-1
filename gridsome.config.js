// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/globals.scss')
      ],
    })
}

module.exports = {
  siteName: 'Jamdocs',
  siteUrl: 'https://jamdocs.netlify.com',
  templates: {
    Doc: '/:slug',
  },
  plugins: [
        {
        use: 'gridsome-plugin-pwa',
        options: {
            title: 'Gridsome',
            startUrl: '/',
            display: 'standalone',
            statusBarStyle: 'default',
            manifestPath: 'manifest.json',
            disableServiceWorker: false,
            serviceWorkerPath: 'sw.js',
            cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg',
            shortName: 'Gridsome',
            themeColor: '#666600',
            backgroundColor: '#ffffff',
            icon: 'static/logo-520.png', // must be provided like 'src/favicon.png'
            msTileImage: '',
            msTileColor: '#666600'
        }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'docs/**/*.md',
        typeName: 'Doc',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000
      }
    }
  ],
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

