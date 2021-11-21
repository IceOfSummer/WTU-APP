import * as TYPE from './mutations-type'

const LOCAL_STORAGE_KEY = 'wtu-app'

export default {
  /**
   * 同步加载本地数据
   * @param state 本地数据
   */
  // eslint-disable-next-line no-unused-vars
  [TYPE.LOAD_LOCAL_STORAGE] (state) {
    try {
      state = JSON.parse(uni.getStorageSync(LOCAL_STORAGE_KEY))
    } catch (e) {
      // JSON解析失败
      console.log(e)
    }
  },
  /**
   * 将登陆成功后的token保存到vuex中
   * @param state state
   * @param token {string} token
   */
  [TYPE.SAVE_LOGIN_TOKEN] (state, token) {
    console.log(`set token: ${token}`)
    state.authorization = token
  }
}
