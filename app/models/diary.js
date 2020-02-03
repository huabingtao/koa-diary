const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../../core/db')
const { NotFound } = require('../../core/http-exception')
const { formatDate } = require('../lib/helper')
const { User } = require('./user')

class Diary extends Model {
  static async getDiary(id, start = 0, count = 10) {
    await User.validatorUser(id)
    const diary = await Diary.findAll({
      where: {
        uid: id
      },
      offset: parseInt(start),
      limit: parseInt(count)
    })
    diary.forEach(item => {
      item.dataValues.create_time = formatDate(item.dataValues.create_time)
    })
    return diary
  }

  static async getAllDiary(start, count) {
    const diary = await Diary.findAll({
      offset: parseInt(start),
      limit: parseInt(count)
    })
    diary.forEach(item => {
      item.dataValues.create_time = formatDate(item.dataValues.create_time)
    })
    return diary
  }

  static async deleteDiary(uid, id) {
    await User.validatorUser(uid)
    const diary = await Diary.destroy({
      where: {
        id
      }
    })
    return diary
  }

  static async updateDiary(uid, id, content) {
    await User.validatorUser(uid)
    const diary = await Diary.update(
      {
        content
      },
      {
        where: {
          id
        }
      }
    )
    return diary
  }
}

Diary.init(
  {
    uid: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    content: DataTypes.STRING(2000),
    create_time: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'diary'
  }
)

module.exports = {
  Diary
}
