const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log = require('./utils/log')
const users = require('./routes/users')
const router = require('koa-router')()

// error handler
onerror(app)

require('./config/db');

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
router.prefix('/api')
router.use(users.routes(), users.allowedMethods())
// routes
app.use(router.routes(), users.allowedMethods())

// error-handling
app.on('error', (err) => {
  log.error(err)
});

module.exports = app
