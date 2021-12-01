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
    state.classes.list = data
  }
}
