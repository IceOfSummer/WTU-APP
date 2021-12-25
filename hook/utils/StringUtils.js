/**
 * 限制字符串的最大长度, 多余的长度将会被'点'代替
 * @param str {string} 目标字符串
 * @param maxSize {number} 最大长度
 */
export const limitSize = (str, maxSize = 10) => {
  return str.length > maxSize ? str.substr(0, maxSize) + '...' : str
}

const VALUE_IN_INPUT_REGX = /value=".*"/

/**
 * 获取html中某个input的value
 * @param html {string} html
 * @param inputName {string} input的名称
 */
export const getInputValue = (html, inputName) => {
  //<input type="hidden" id="localeKey" name="localeKey" value="zh_CN" />
  const intRegx = new RegExp('<input.* name="' + inputName + '".*>')
  const match = html.match(intRegx)
  if (match == null) {
    return null
  }
  const matchValue = match[0].match(VALUE_IN_INPUT_REGX)
  if (matchValue == null) {
    return null
  }
  return matchValue[0].replace(/"/g, '').replace('value=', '').replace(/\\/g, '')
}
