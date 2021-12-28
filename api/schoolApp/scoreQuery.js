import { getCurTerm } from '../../hook/utils/DateUtils'
import { noRepeatAjax } from '../../hook/ajax'

/**
 * 获取学生成绩
 * @param year {number} 年份
 * @param username {string} 用户名
 * @param token {string} token
 * @param term {number} 学期
 */
export const getStudentScore = (year, username, token, term = getCurTerm()) => noRepeatAjax('/wtu/eduSystem/score/query', 'GET', { year, username, token, term })