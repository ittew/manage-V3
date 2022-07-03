const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log = require('./utils/log')
const users = require('./routes/users')
const router = require('koa-router')()
const koajwt = require('koa-jwt')
const utils = require('./utils/utils')

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
  await next().catch(err => {
    if (+err.status === 401) {
      ctx.status = 200
      ctx.body = utils.fail('Token认证失败', utils.CODE.AUTH_ERROR)
    } else {
      throw err
    }
  })
})

app.use(koajwt({secret: 'imooc'}).unless({
  path: ['/api/users/login']
})) // token验证 去除不需要认证的接口url

router.prefix('/api')

router.use(users.routes(), users.allowedMethods())
// routes
app.use(router.routes(), users.allowedMethods())

// error-handling
app.on('error', (err) => {
  log.error(err)
});

module.exports = app
