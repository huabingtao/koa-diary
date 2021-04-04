/*
 * @Author: your name
 * @Date: 2020-02-06 13:40:27
 * @LastEditTime: 2021-04-04 17:17:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa-diary/app.js
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser') // 获取Body参数
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const cors = require('koa2-cors')

const app = new Koa()

console.log('环境变量:',process.env.NODE_ENV);

app.use(cors())
app.use(catchError)
app.use(bodyParser())
InitManager.initCore(app)
app.listen(3000)
