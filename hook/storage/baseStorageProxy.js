/**
 * 代理某个对象
 * 提供了基础的缓存, 无法被vue的ref代理
 * @param obj {any} 目标对象
 * @return {Object} 被代理的对象
 */
export default function baseStorageProxy(obj) {
  return new Proxy(obj, {
    get(target, p) {
      if (obj[p]) {
        // 直接使用缓存
        if (Array.isArray(obj[p])) {
          if (obj[p].length !== 0) {
            return obj[p]
          }
        } else {
          return obj[p]
        }
      }
      const data = uni.getStorageSync(p)
      // 添加缓存
      obj[p] = data
      return data
    },
    set(target, p, value) {
      let key = null
      if (typeof p === 'symbol') {
        key = p.toString()
      } else {
        key = p
      }
      console.log(value)
      // 更新缓存
      if (value) {
        uni.setStorage({
          key,
          data: value
        })
        obj[p] = value
      } else {
        uni.removeStorage({
          key
        })
        obj[p] = undefined
      }
      return true
    }
  })
}
