export default function (store) {

  const localStorageHandler = {
    get(target, p) {
      return target[p]
    },
    set(target, p, value) {
      uni.setStorage({
        key: p.toString(),
        data: value
      })
      target[p] = value
      return true
    }
  }

  const loadStorage = (obj) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        // 另外一个对象, 继续代理
        obj[key] = loadStorage(obj[key])
      } else {
        // 数组或基本数据类型
        obj[key] = uni.getStorageSync(key)
      }
    })
    return new Proxy(obj, localStorageHandler)
  }

  const proxyState = loadStorage(JSON.parse(JSON.stringify(store.state)))

  // 添加代理
  store.replaceState(proxyState)

}
