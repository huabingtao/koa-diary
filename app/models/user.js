const { Model, DataTypes, Sequelize } = require('sequelize')
const { sequelize } = require('../../core/db')
const { NotFound } = require('../../core/http-exception')

class User extends Model {
  static async validatorUser(id) {
    const user = await User.findOne({
      where: {
        id
      }
    })
    if (!user) {
      throw new NotFound('账号不存在')
    }
    return user
  }

  static async validatorEmail(email, password) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new NotFound('账号不存在')
    }
    if (user.password !== password) {
      throw new NotFound('密码错误')
    }
    return user
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    nickname: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize,
    tableName: 'user'
  }
)

module.exports = {
  User
}
