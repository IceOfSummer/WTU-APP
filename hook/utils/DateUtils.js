/**
 * 获取当前的星期
 * @return {number} 1为周一, 2为周二 ... 7为周日
 */
export const getCurDay = () => {
  const temp = new Date().getDay()
  return temp === 0 ? 7 : temp
}

/**
 * 获取当前的学期
 * @return {number} 返回1代表上学期 2代表下学期
 */
export const getCurTerm = () => {
  const month = new Date().getMonth()
  // 1: 上学期 2: 下学期
  return month >= 8 || month <= 1 ? 1 : 2
}

/**
 * 格式化日期, 如1 -> 01, 5 -> 05
 * @param date {number | string}
 * @return {string} 格式化后的日期
 */
export const formatDate = (date) => {
  if (typeof date === 'number') {
    return date < 10 ? '0' + date : date.toString()
  } else {
    // string
    return date.length === 1 ? '0' + date : date
  }
}
