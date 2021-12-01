/**
 * 限制字符串的最大长度, 多余的长度将会被'点'代替
 * @param str {string} 目标字符串
 * @param maxSize {number} 最大长度
 */
export const limitSize = (str, maxSize = 10) => {
  return str.length > maxSize ? str.substr(0, maxSize) + '...' : str
}
