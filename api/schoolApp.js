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

/**
 * 查询空课表
 * @param year {number} 查哪一年
 * @param classroomPos {string} 教室地点
 * @param week {number} 查哪几周
 * @param day {string} 查哪个星期
 * @param duration {number} 查哪几节课
 * @param token {string} token
 * @param page {number} 查哪一页，默认为1
 */
export const getEmptyClassroom = (year, classroomPos, week, day, duration, token, page = 1) => noRepeatAjax('/wtu/eduSystem/classroom/search', 'GET',
  {
    schoolPos: 2,
    classroomPos,
    year,
    term: 3,
    week,
    day,
    duration,
    token,
    page
  })
