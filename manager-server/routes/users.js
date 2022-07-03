const router = require('koa-router')()
const User = require('../models/userSchema')
const util = require('../utils/utils')
const jwt = require('jsonwebtoken')

router.prefix('/users')

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body
    const res = await User.findOne({
      userName,
      userPwd
    }, 'userId userName userEmail state role deptId roleList')
    const data = res && res._doc
    const token = jwt.sign({ data }, 'imooc', { expiresIn: '1h'})
    if (data) {
      data.token = token
      ctx.body = util.success(data)
    } else {
      ctx.body = util.fail("用户名或密码错误")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
