export default function (store) {

  /**
   * 内部的flag是为了防止对象的key重复, 使用flag后除非两个对象完全相同, 否则不可能会出现重复key
   */
  const localStorageHandler = {
    get(target, p) {
      return target[p.toString()]
    },
    set(target, p, value) {
      const flag = JSON.stringify(Object.getOwnPropertyNames(target))
      uni.setStorage({
        key: flag + p.toString(),
        data: value
      })
      target[p] = value
      return true
    }
  }

  const loadStorage = (obj) => {
    const flag = JSON.stringify(Object.getOwnPropertyNames(obj))
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        // 另外一个对象, 继续代理
        obj[key] = loadStorage(obj[key])
      } else {
        // 数组或基本数据类型
        obj[key] = uni.getStorageSync(flag + key)
      }
    })
    return new Proxy(obj, localStorageHandler)
  }

  const proxyState = loadStorage(JSON.parse(JSON.stringify(store.state)))

  // 添加代理
  store.replaceState(proxyState)

}
