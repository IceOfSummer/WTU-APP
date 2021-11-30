import ajax from '../hook/ajax'
import useStorage from '../hook/storage'
const storage = useStorage()

/**
 * 获取课表
 * @param year 年份
 * @param time 第几学期
 * @return {Promise<unknown>}
 */
export const getClasses = (year, time) => ajax({
  url: 'http://jwglxt.wtu.edu.cn/kbcx/xskbcx_cxXsKb.html?gnmkdm=N2151&su=' + storage.schoolUsername,
  data: {
    xnm: year,
    xqm: time
  },
  methods: 'POST',
  headers: {
    Cookie: 'JSESSIONID=' + storage.schoolToken
  }
})
