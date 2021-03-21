/*
 * @Author: hbt
 * @Date: 2021-03-21 17:23:31
 * @LastEditTime: 2021-03-21 22:51:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa-diary/config/config.js
 */
// module.exports = {
//   // prod
//   environment: "dev",
//   database: {
//     dbName: "diary",
//     // host: "139.196.94.6",
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     // password: "123456",
//     password: "hbt223123",
//   },
//   host: "139.196.94.6",
// };

const env = process.env.NODE_ENV

module.exports = {
  environment: env,
  database: {
    dbName: 'diary',
    host: env === 'development' ? 'localhost' : "139.196.94.6",
    port: 3306,
    user: 'root',
    password: 'hbt223123',
  },
  host: env === 'development' ?  'http://localhost:3001/' : "139.196.94.6",
};
