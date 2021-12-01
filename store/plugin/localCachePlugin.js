const VUEX_KEY = 'vuex'
export default function (store) {
  // init
  const cache = uni.getStorageSync(VUEX_KEY)
  if (cache) {
    store.replaceState(cache)
  }

  store.subscribe((mutation, state) => {
    // 每次调用mutation之后调用
    console.log(mutation)
    console.log(state)
    uni.setStorage({
      key: VUEX_KEY,
      data: state
    })
  })
}
