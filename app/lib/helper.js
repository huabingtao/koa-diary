const { Success } = require('../../core/http-exception')
function success(msg) {
  throw new Success(msg)
}

function formatDate(timeObj) {
  const date = new Date(timeObj)
  const y = date.getFullYear()
  const m =
    (date.getMonth() + 1).toString().length === 1
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const d =
    date.getDate().toString().length === 1
      ? '0' + date.getDate()
      : date.getDate()
  return y + '年' + m + '月' + d + '日'
}

module.exports = {
  success,
  formatDate
}
