import * as TYPE from './mutations-type'
import useStorage from '../hook/storage'
const storage = useStorage()

export default {
  /**
   * 同步加载本地数据
   * @param state 本地数据
   */
  [TYPE.INIT_STORE] (state) {
    state.schoolToken = storage.schoolToken
    state.token = storage.token
  },
  /**
   * 将登陆成功后的token保存到vuex中
   * @param state state
   * @param token {string} token
   */
  [TYPE.SAVE_LOGIN_TOKEN] (state, token) {
    console.log(`set token: ${token}`)
    state.authorization = token
  },
  /**
   * 登出
   * @param state state
   */
  [TYPE.LOG_OUT] (state) {
    state.schoolToken = ''
    storage.schoolToken = ''
  }
}
