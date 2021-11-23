/**
 * 代理某个对象
 * 提供了基础的缓存, 在调用get方法时返回的是一个ref对象
 * 不可以利用refStorageProxy获的
 * @param obj {any} 目标对象
 * @return {Object} 被代理的对象
 */
import { toRef } from 'vue'

export default function refStorageProxy(obj) {
  return new Proxy(obj, {
    get(target, p) {
      if (obj[p]) {
        // 直接使用缓存
        return obj[p]
      } else {
        // 添加缓存
        obj[p] = uni.getStorageSync(p)
        return toRef(obj, p)
      }
    },
    set() {
      return false
    }
  })
}
