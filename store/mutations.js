import * as TYPE from './mutations-type'
import { getInputValue } from '../hook/utils/StringUtils'
/**
 * 根据当前周,调整课表信息
 * @param subjects {Array} 课表信息, 该操作会修改数组原有的值
 * @param curWeek {number} 当前周
 * @return {Void} 该操作会修改subjects原有的值
 */
function adjustSubjectList(subjects, curWeek) {

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

  /**
   * type-> 0: 当前正在上的课  1: 已结课  2:未开始
   * @see ClassesInfoItem.vue
   */
  subjects.forEach(value => {
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

}

export default {
  /**
   * 将登陆成功后的token保存到vuex中
   * @param state state
   * @param data {{token: string, username: string, password: string}} token
   */
  [TYPE.SAVE_SCHOOL_LOGIN_INFO] (state, data) {
    state.eduSystemUser.token = data.token
    state.eduSystemUser.username = data.username
    state.eduSystemUser.password = data.password
    state.eduSystemUser.isUsableToken = true
  },
  /**
   * 登出
   * @param state state
   */
  [TYPE.EDU_SYSTEM_LOG_OUT] (state) {
    state.eduSystemUser.token = ''
    state.eduSystemUser.isUsableToken = false
  },
  /**
   * 添加课程表
   * @param state state
   * @param data {Array<Object>}
   */
  [TYPE.SET_CLASSES] (state, data) {
    const curWeek = state.classes.classesOptions.curWeek

    adjustSubjectList(data, curWeek)

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
        // 重新给课表排序
        if (state.classes.list) {
          adjustSubjectList(state.classes.list, option.value)
        }
      }
      state.classes.classesOptions[option.key] = option.value

    } else {
      console.error(`can not find key: ${option.key} in state.classes.classesOptions`)
    }
  },
  /**
   * 无效化教务系统的token
   * @param state state
   */
  [TYPE.INVALID_EDU_SYSTEM_TOKEN] (state) {
    state.eduSystemUser.isUsableToken = false
  },
  /**
   * 修改教务系统设置
   * @param state state
   * @param option {{key: string, value: unknown}}
   */
  [TYPE.SET_EDU_SYSTEM_OPTIONS] (state, option) {
    state.eduSystemUser.config[option.key] = option.value
  },
  /**
   * 加载选课工具查询参数
   * @param state state
   * @param html {string} html
   */
  [TYPE.LOAD_CLASS_QUERY_INFO_1] (state, html) {
    Object.keys(state.classSelectInfo.queryParam1).forEach(key => {
      const value = getInputValue(html, key)
      if (value != null) {
        state.classSelectInfo.queryParam1[key] = value
      }
    })
    // 特殊值处理
    state.classSelectInfo.queryParam1.jg_id = getInputValue(html, 'jg_id_1')
    state.classSelectInfo.queryParam1.xkkz_id = getInputValue(html, 'firstXkkzId')
    state.classSelectInfo.queryParam1.kklxdm = getInputValue(html, 'firstKklxdm')
  },
  /**
   * 加载选课工具查询参数
   * @param state state
   * @param html {string} html
   */
  [TYPE.LOAD_CLASS_QUERY_INFO_2] (state, html) {
    Object.keys(state.classSelectInfo.queryParam2).forEach(key => {
      const value = getInputValue(html, key)
      if (value != null) {
        state.classSelectInfo.queryParam2[key] = value
      }
    })
    // 特殊值处理

  }
}
