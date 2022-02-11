import { noRepeatAjax } from '../../hook/ajax'

/**
 * 获取课表
 * @param year {number} 年份
 * @param time {number} 第几学期
 * @param username {string} 用户名
 * @return {Promise<unknown>}
 */
export const getClasses = (year, time, username) =>
  noRepeatAjax(`http://jwglxt.wtu.edu.cn/kbcx/xskbcx_cxXsKb.html?gnmkdm=N2151&su=${username}`, 'POST', {
    xnm: year,
    xqm: time === 1 ? 3 : 12,
    kzlx: 'ck'
  })
/**
 * 从服务器获取当前周
 * xqh_id: 1: 南湖 2: 阳光 3: 东湖
 * @return {Promise<unknown>}
 */
export const getCurWeekFromServer = (year, term) => noRepeatAjax(`http://jwglxt.wtu.edu.cn/cdjy/cdjy_cxXqjc.html?xqh_id=2&xnm=${year}&xqm=${term === 1 ? 3 : 12}&gnmkdm=N2155`)

