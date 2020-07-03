const Router = require('koa-router');
const { PostFavorValidator } = require('../validators/validator');
const { success } = require('../lib/helper');
const { Favor } = require('../models/favor');

const router = new Router({
  prefix: '/favor',
});

router.post('/', PostFavorValidator, async (ctx) => {
  const { uid, diary_id } = ctx.request.body;
  await Favor.increment(uid, diary_id);
  success();
});

module.exports = router;
