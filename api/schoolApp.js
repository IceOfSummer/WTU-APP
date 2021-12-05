import ajax, { noRepeatAjax } from '../hook/ajax'

/**
 * 获取课表
 * @param year {number} 年份
 * @param time {number} 第几学期
 * @param username {string} 用户名
 * @param token {string} 登录验证token
 * @return {Promise<unknown>}
 */
export const getClasses = (year, time, username, token) => ajax({
  url: 'http://jwglxt.wtu.edu.cn/kbcx/xskbcx_cxXsKb.html?gnmkdm=N2151&su=' + username,
  data: {
    xnm: year,
    xqm: time
  },
  methods: 'POST',
  headers: {
    Cookie: 'JSESSIONID=' + token
  }
})

/**
 * 从服务器获取当前周
 * @return {Promise<unknown>}
 */
export const getCurWeekFromServer = () => noRepeatAjax('/wtu/app')

/**
 * 获取用户信息
 * @param username {string} 用户名
 * @param token {string} token
 */
export const getUserInfo = (username, token) => ajax({
  url: `http://jwglxt.wtu.edu.cn/xsxxxggl/xsgrxxwh_cxXsgrxx.html?gnmkdm=N100801&layout=default&su=${username}`,
  headers: {
    Cookie: 'JSESSIONID=' + token
  }
})
