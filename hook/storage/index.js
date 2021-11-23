import baseStorageProxy from './baseStorageProxy'
const storage = {
  /**
   * 登录token
   */
  token: '',
  /**
   * 教务系统token
   */
  schoolToken: ''
}

const baseStorage = baseStorageProxy(storage)

// /**
//  * 将对象的某个值转换为ref
//  * @param key 对象的key
//  */
// export const storageToRef = (key) => toRef(storage, key)

/**
 * 使用默认的存储方式, 可以用于修改值
 * @return {*}
 */
export default function useStorage() {
  return baseStorage
}

