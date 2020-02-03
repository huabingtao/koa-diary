const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('loadsh')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 连接数据库
  host,
  port,
  timezone: '+08:00',
  define: {
    logging: true,
    timestamps: true, // 时间字段
    paranoid: true, // 删除字段
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 驼峰转化下划线
    freezeTableName: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }
  }
})

sequelize.sync({
  force: false
})

Model.prototype.toJSON = function() {
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'deleted_at')
  // unset(data, 'created_at')

  if (isArray(this.exclude)) {
    this.exclude.forEach(value => {
      unset(data, value)
    })
  }

  return data
}

module.exports = {
  sequelize
}
