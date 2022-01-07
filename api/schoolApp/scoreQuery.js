import { getCurTerm } from '../../hook/utils/DateUtils'
import { noRepeatAjax, sessionAjax } from '../../hook/ajax'

/**
 * 获取学生成绩
 * @param year {number} 年份
 * @param username {string} 用户名
 * @param token {string} token
 * @param term {number} 学期
 */
export const getStudentScore = (year, username, token, term = getCurTerm()) => noRepeatAjax('/wtu/eduSystem/score/query', 'GET', { year, username, token, term })

/**
 * 获取成绩详细信息
 * @return {Promise<unknown>}
 */
export const getScoreDetail = (username, jxb_id, xnm, xqm, kcmc, session) => sessionAjax(`/proxy/cjcx/cjcx_cxCjxqGjh.html?time=${Date.now()}&gnmkdm=N305005&su=${username}`,
  session ,'POST', {
  jxb_id,
  xnm,
  xqm,
  kcmc
})
