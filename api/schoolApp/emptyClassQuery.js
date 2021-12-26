import { noRepeatAjax } from '../../hook/ajax'
import { getCurTerm } from '../../hook/utils/DateUtils'

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
    term: getCurTerm(),
    week,
    day,
    duration,
    token,
    page
  })
