import * as TYPE from './actions-type'

const LOCAL_STORAGE_KEY = 'wtu-app'

export default {
  /**
   * 将state的数据异步保存到本地
   * @param state state数据
   */
  [TYPE.SAVE_STATE_TO_LOCAL] ({ state }) {
    uni.setStorage({
      key: LOCAL_STORAGE_KEY,
      data: JSON.stringify(state)
    })
  }
}
