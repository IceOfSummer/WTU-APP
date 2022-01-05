import * as TYPE from './actions-type'
import { INVALID_EDU_SYSTEM_TOKEN, SET_CLASSES_OPTIONS } from './mutations-type'
import { getCurWeekFromServer } from '../api/schoolApp/classTableQuery'
import { showToast } from '../hook/utils/TipUtils'
export default {
  /**
   * 校准课表显示的当前周
   */
  [TYPE.ADJUST_CUR_WEEK] ({ commit, state, dispatch }) {
    // 优先尝试本地校准
    const lastUpdate = state.classes.classesOptions.curWeekLastUpdate
    if (lastUpdate) {
      // 存在本地记录, 使用缓存
      let week = state.classes.classesOptions.curWeek

      // 上次更新,(换算为天数)
      const lastDate = Math.floor(lastUpdate / 1000 / 60 / 60 / 24)
      const curDate = Math.floor(Date.now() / 1000 / 60 / 60 / 24)

      // 相差多少天
      let duration = curDate - lastDate

      // 上次更新是周几
      let temp = new Date(lastUpdate).getDay()
      // 周日对应的值是0, 将其变为7
      temp = temp === 0 ? 7 : temp

      for (let i = 0; i < duration; i++) {
        temp++
        if (temp === 8) {
          week++
          temp = 1
        }
      }
      commit(SET_CLASSES_OPTIONS, { key: 'curWeek', value: week })
      commit(SET_CLASSES_OPTIONS, { key: 'curWeekLastUpdate', value: Date.now() })

    } else {
      // 获取服务器记录
      dispatch(TYPE.ADJUST_CUR_WEEK_FROM_SERVER)
    }
  },
  /**
   * 从服务器校准当前周
   */
  [TYPE.ADJUST_CUR_WEEK_FROM_SERVER] ({ commit }) {
    return new Promise((resolve, reject) => {
      getCurWeekFromServer().then(resp => {
        if (resp.code === 0) {
          commit(SET_CLASSES_OPTIONS, { key: 'curWeek', value: resp.data })
          commit(SET_CLASSES_OPTIONS, { key: 'curWeekLastUpdate', value: Date.now() })
          resolve(1)
        } else {
          reject(resp.message)
        }
      })
    })
  },
  /**
   * 代理学校接口响应
   * @param commit commit
   * @param state state
   * @param promise {Promise}
   */
  [TYPE.PROXY_SCHOOL_APP_AJAX] ({ commit, state }, promise) {
    return new Promise((resolve, reject) => {
      promise.then(resp => {
        if (resp.code === 100) {
          // 登录失效
          commit(INVALID_EDU_SYSTEM_TOKEN)
          reject('登录失效')
          if (state.eduSystemUser.config.autoRedirectLoginPage) {
            uni.navigateTo({ url: '/pages/SchoolAuth/SchoolAuth' })
          }
        }
        // success
        try {
          resolve(JSON.parse(resp.data))
        } catch (e) {
          // JSON解析失败
          resolve(resp.data)
        }
      }).catch(e => {
        showToast('出错了! 请重新尝试')
         console.log(e)
        reject(e)
      })
    })
  }
}
