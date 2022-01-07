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
 * @return {Promise<unknown>}
 */
export const getCurWeekFromServer = () => noRepeatAjax('/wtu/eduSystem/subject/adjust')

