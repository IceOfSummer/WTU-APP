import { getCurTerm } from '../../hook/utils/DateUtils'
import { noRepeatAjax } from '../../hook/ajax'

/**
 * 获取学生成绩
 * @param year {number} 年份
 * @param username {string} 用户名
 * @param term {number} 学期
 */
export const getStudentScore = (year, username, term = getCurTerm()) => noRepeatAjax(`http://jwglxt.wtu.edu.cn/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005&su=${username}`, 'POST',
  {
    xnm: year,
    xqm: term === 1 ? 3 : 12,
    _search: false,
    nd: Date.now(),
    'queryModel.showCount': 15,
    'queryModel.currentPage': 1,
    'queryModel.sortOrder': 'asc',
    'time': 1,
  })

/**
 * 获取成绩详细信息
 * @return {Promise<unknown>}
 */
export const getScoreDetail = (username, jxb_id, xnm, xqm, kcmc) => noRepeatAjax(`http://jwglxt.wtu.edu.cn/cjcx/cjcx_cxCjxqGjh.html?time=${Date.now()}&gnmkdm=N305005&su=${username}`, 'POST', {
  jxb_id,
  xnm,
  xqm,
  kcmc
})
