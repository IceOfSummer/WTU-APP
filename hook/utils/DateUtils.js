/**
 * 获取当前的星期
 * @return {number} 1为周一, 2为周二 ... 7为周日
 */
export const getCurDay = () => {
  const temp = new Date().getDay()
  return temp === 0 ? 7 : temp
}
