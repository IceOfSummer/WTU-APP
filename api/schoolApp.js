import { noRepeatAjax } from '../hook/ajax'

/**
 * 获取课表
 * @param year {number} 年份
 * @param time {number} 第几学期
 * @param username {string} 用户名
 * @param token {string} 登录验证token
 * @return {Promise<unknown>}
 */
export const getClasses = (year, time, username, token) => noRepeatAjax('/wtu/eduSystem/subject/list',
  'GET', { username, year, time, token })
/**
 * 从服务器获取当前周
 * @return {Promise<unknown>}
 */
export const getCurWeekFromServer = () => noRepeatAjax('/wtu/eduSystem/subject/adjust')

/**
 * 获取用户信息
 * @param username {string} 用户名
 * @param token {string} token
 */
export const getUserInfo = (username, token) => noRepeatAjax('/wtu/eduSystem/info', 'GET', { username, token })
