const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = require('./app')
require('dotenv').config()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

console.log(process.env.PORT)
console.log(process.env.NODE_ENV)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  if (process.env.DEV_TYPE !== 'backend') {
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    app.use(nuxt.render)
  }

  // Give nuxt middleware to express

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
