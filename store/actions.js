import * as TYPE from './actions-type'
import { SET_CLASSES_OPTIONS } from './mutations-type'
import { getCurWeekFromServer } from '../api/schoolApp'
export default {
  /**
   * 校准课表显示的当前周
   */
  [TYPE.ADJUST_CUR_WEEK] ({ commit, state, dispatch }) {
    // 优先尝试本地校准
    const lastUpdate = state.classes.classesOptions.curWeekLastUpdate
    if (lastUpdate) {
      // 存在本地记录, 使用缓存
      const lastWeek = state.classes.classesOptions.curWeek
      // 上次更新,(换算为天数)
      const last = lastUpdate / 1000 / 60 / 24
      const today = Date.now() / 1000 / 60 / 24

      let duration = 0
      let temp = today - last
      while (temp >= 7) {
        duration++
        temp -= 7
      }
      commit(SET_CLASSES_OPTIONS, { key: 'curWeek', value: lastWeek + duration })
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
  }
}
