const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');
const { NotFound, LikeError } = require('../../core/http-exception');
const { User } = require('./user');

class Favor extends Model {
  static async increment(uid, diary_id) {
    await User.validatorUser(uid);
    const f = await Favor.findOne({
      where: {
        uid,
        diary_id,
      },
    });
    if (f) {
      throw new LikeError();
    }
    return sequelize.transaction(async (t) => {
      await Favor.create(
        {
          uid,
          diary_id,
        },
        { transaction: t }
      );
      const { Diary } = require('./diary');
      const diary = await Diary.findOne({
        where: {
          id: diary_id,
        },
      });
      if (!diary) {
        throw new NotFound('日记不存在');
      }
      await diary.increment('favor_nums', { by: 1, transaction: t });
    });
  }
}

Favor.init(
  {
    uid: DataTypes.INTEGER,
    diary_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'favor',
  }
);

module.exports = {
  Favor,
};
