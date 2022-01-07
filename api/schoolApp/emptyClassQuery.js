import { noRepeatAjax } from '../../hook/ajax'
import { getCurTerm } from '../../hook/utils/DateUtils'

/**
 * 查询空课表
 * @param year {number} 查哪一年
 * @param classroomPos {string} 教室地点
 * @param week {number} 查哪几周
 * @param day {string} 查哪个星期
 * @param duration {number} 查哪几节课
 * @param term {number} term
 * @param page {number} 查哪一页，默认为1
 */
export const getEmptyClassroom = (year, classroomPos, week, day, duration, term, page = 1) =>
  noRepeatAjax('http://jwglxt.wtu.edu.cn/cdjy/cdjy_cxKxcdlb.html?doType=query&gnmkdm=N2155', 'POST',
  {
    fwzt: 'cx',
    xqh_id: 2,
    xnm: year,
    xqm: getCurTerm() === 1 ? 3 : 12,
    lh: classroomPos,
    jyfs: 0,
    zcd: week,
    xqj: day,
    jcd: duration,
    _search: false,
    'queryModel.showCount': 15,
    'queryModel.currentPage': page,
    'queryModel.sortName': 'cdbh',
    'queryModel.sortOrder': 'asc',
    'time': 1,
    'nd': Date.now()
  })
