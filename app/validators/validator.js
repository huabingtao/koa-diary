const validator = require('validator')
const { ParameterException } = require('../../core/http-exception')

const RegisterValidator = async function(ctx, next) {
  const { email, password1, password2 } = ctx.request.body
  let v = validator.isLength(email, { min: 6, max: 64 })
  if (!v) {
    throw new ParameterException('email长度必须在6~64个字符')
  }
  v = validator.isEmail(email)
  if (!v) {
    throw new ParameterException('email格式错误')
  }
  v = validator.isLength(password1, { min: 6, max: 32 })
  if (!v) {
    throw new ParameterException('密码至少6个字符，最多32个字符')
  }
  v = validator.isLength(password2, { min: 6, max: 32 })
  if (!v) {
    throw new ParameterException('密码至少6个字符，最多32个字符')
  }
  if (password1 !== password2) {
    throw new ParameterException('两个密码必须相同')
  }
  await next()
}

const DiaryValidator = async (ctx, next) => {
  const { content } = ctx.request.body
  if (content.length > 1000) {
    throw new ParameterException('内容超过1000字')
  }
  await next()
}

const GetDiaryValidator = async (ctx, next) => {
  const { start, count } = ctx.request.query
  if (!start || !count) {
    await next()
    return
  }
  let v = validator.isInt(start)
  if (!v) {
    throw new ParameterException('start不符合规范')
  }
  v = validator.isInt(count)
  if (!v) {
    throw new ParameterException('count不符合规范')
  }
  await next()
}

const PutDiaryValidator = async (ctx, next) => {
  const { content } = ctx.request.body
  let v = validator.isEmpty(content)
  if (v) {
    throw new ParameterException('content不能为空')
  }
  await next()
}

const PostFavorValidator = async (ctx, next) => {
  const { uid, diary_id } = ctx.request.body
  let v = validator.isEmpty(uid)
  if (v) {
    throw new ParameterException('uid 不能为空')
  }
  v = validator.isEmpty(diary_id)
  if (v) {
    throw new ParameterException('diary_id 不能为空')
  }
  await next()
}

module.exports = {
  RegisterValidator,
  DiaryValidator,
  GetDiaryValidator,
  PutDiaryValidator,
  PostFavorValidator
}
