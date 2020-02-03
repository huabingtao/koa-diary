const Router = require('koa-router')
const {
  DiaryValidator,
  GetDiaryValidator,
  PutDiaryValidator
} = require('../validators/validator')
const { NotFound } = require('../../core/http-exception')
const { success } = require('../lib/helper')
const { User } = require('../models/user')
const { Diary } = require('../models/diary')

const router = new Router({
  prefix: '/diary'
})

router.post('/', DiaryValidator, async ctx => {
  const { id, content } = ctx.request.body
  const user = await User.validatorUser(id)
  const date = new Date()
  await Diary.create({
    uid: id,
    content,
    nickname: user.nickname,
    create_time: date
  })
  success()
})

router.get('/myDiary', GetDiaryValidator, async ctx => {
  const { id, start, count } = ctx.request.query
  const diarys = await Diary.getDiary(id, start, count)
  ctx.body = diarys
})

router.get('/:id', async ctx => {
  const { id } = ctx.params
  const diary = await Diary.findOne({
    where: {
      id: parseInt(id)
    }
  })
  if (!diary) {
    throw new NotFound('文章未找到')
  }
  ctx.body = diary
})

router.get('/', GetDiaryValidator, async ctx => {
  const { start = 0, count = 10 } = ctx.request.query
  const diarys = await Diary.getAllDiary(start, count)
  ctx.body = diarys
})

router.delete('/', async ctx => {
  const { uid, id } = ctx.request.body
  await Diary.deleteDiary(uid, id)
  success()
})

router.put('/', PutDiaryValidator, async ctx => {
  const { uid, id, content } = ctx.request.body
  await Diary.updateDiary(uid, id, content)
  success()
})

module.exports = router
