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
