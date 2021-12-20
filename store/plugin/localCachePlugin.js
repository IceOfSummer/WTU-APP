export default function (store) {


  function getFlagStr (firstKey) {
    // 将对象的第一个属性名称当做唯一标识符
    firstKey = firstKey.toLowerCase()
    let flag = ''

    // 乱序flag
    for (let i = 0, len = firstKey.length; i < len; i++) {
      let tempAscii = firstKey.charCodeAt(i) + 1
      let temp
      if (tempAscii > 'z'.charCodeAt(0)) {
        temp = 'a'
      } else {
        temp = String.fromCharCode(tempAscii)
      }
      flag += temp
    }
    flag += '-'
    return flag
  }

  /**
   * 内部的flag是为了防止对象的key重复, 使用flag后除非两个对象完全相同, 否则不可能会出现重复key
   */
  const localStorageHandler = {
    get(target, p) {
      return target[p.toString()]
    },
    set(target, p, value) {
      uni.setStorage({
        key: getFlagStr(Object.keys(target)[0]) + p.toString(),
        data: value
      })
      target[p] = value
      return true
    }
  }

  const loadStorage = (obj) => {
    const keys = Object.keys(obj)
    const flag = getFlagStr(keys[0])
    keys.forEach(key => {
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
