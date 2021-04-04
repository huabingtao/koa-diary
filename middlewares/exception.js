/*
 * @Author: your name
 * @Date: 2020-01-17 16:39:41
 * @LastEditTime: 2021-04-04 16:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa-diary/middlewares/exception.js
 */
const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'development'
    if (isDev) {
      if (!isHttpException) {
        throw error
      }
    }

    if (isHttpException) {
      ctx.body = {
        message: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        message: '服务器发生了点问题请稍后再试吧',
        errorCode: '9999',
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
