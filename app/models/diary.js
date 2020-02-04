const { Model, DataTypes, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { NotFound } = require('../../core/http-exception')
const { formatDate } = require('../lib/helper')
const { User } = require('./user')
const { Favor } = require('./favor')

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
    function findAllId(list) {
      let res = []
      list.forEach(item => {
        res.push(item.id)
      })
      return res
    }

    const diary = await Diary.findAll({
      offset: parseInt(start),
      limit: parseInt(count)
    })

    const diaryIds = findAllId(diary)

    const favors = await Favor.findAll({
      where: {
        diary_id: {
          [Op.in]: diaryIds
        }
      }
    })

    diary.forEach(item => {
      item.dataValues.create_time = formatDate(item.dataValues.create_time)
      favors.forEach(f => {
        if (item.uid === f.uid && item.id === f.diary_id) {
          item.dataValues.isFavor = 1
        } else {
          item.dataValues.isFavor = 0
        }
      })
    })
    return diary
  }

  static async deleteDiary(uid, id) {
    await User.validatorUser(uid)
    const diary = await Diary.destroy({
      force: true, // 硬删除
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
    create_time: DataTypes.DATE,
    favor_nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'diary'
  }
)

module.exports = {
  Diary
}
