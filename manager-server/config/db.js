const config = require('./index')
const log = require('../utils/log');
const mongoose = require('mongoose')
mongoose.connect(config.URL, {useNewUrlParser:true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
    log.error('数据库连接失败')
})

db.on('open', () => {
    log.info('数据库连接成功')
})
