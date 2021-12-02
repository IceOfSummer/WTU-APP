import * as TYPE from './mutations-type'

export default {
  /**
   * 将登陆成功后的token保存到vuex中
   * @param state state
   * @param data {{token: string, username: string}} token
   */
  [TYPE.SAVE_SCHOOL_LOGIN_INFO] (state, data) {
    state.schoolToken = data.token
    state.schoolUsername = data.username
  },
  /**
   * 登出
   * @param state state
   */
  [TYPE.LOG_OUT] (state) {
    state.schoolToken = ''
  },
  /**
   * 添加课程表
   * @param state state
   * @param data {Array<Object>}
   */
  [TYPE.SET_CLASSES] (state, data) {
    console.log('reset')
    /**
     * 分离开始和结束周
     * @param classes {Object} 课程信息
     * @return {{start: number, end: number}}
     */
    const getWeek = (classes) => {
      const temp = classes.zcd.replace('周', '').split('-')
      const start = Number.parseInt(temp[0])
      const end = Number.parseInt(temp[1])
      return {
        start,
        end
      }
    }

    const curWeek = state.classes.classesOptions.curWeek

    /**
     * type-> 0: 当前正在上的课  1: 已结课  2:未开始
     * @see ClassesInfoItem.vue
     */
    data.forEach(value => {
      const week = getWeek(value)
      if (week.end < curWeek) {
        // 结课
        value.type = 1
      } else if (week.start > curWeek) {
        // 未开始
        value.type = 2
      } else {
        // 正在上
        value.type = 0
      }
    })

    state.classes.list = data
  },
  /**
   * 配置课程表的设置
   * @param state state
   * @param option {{key: string, value: unknown}}
   */
  [TYPE.SET_CLASSES_OPTIONS] (state, option) {
    if (Object.hasOwnProperty.call(state.classes.classesOptions, option.key)) {
      if (option.key === 'curWeek') {
        // 特殊配置
        state.classes.classesOptions.curWeekLastUpdate = Date.now()
      }
      state.classes.classesOptions[option.key] = option.value

    } else {
      console.error(`can not find key: ${option.key} in state.classes.classesOptions`)
    }
  }
}
