const Koa = require('koa')
const bodyParser = require('koa-bodyparser') // 获取Body参数
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const cors = require('koa2-cors')

const app = new Koa()

app.use(cors())
app.use(catchError)
app.use(bodyParser())
InitManager.initCore(app)
app.listen(3000)
