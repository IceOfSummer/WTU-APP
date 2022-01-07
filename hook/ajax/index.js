import { getServerUrl } from '../utils/serverUtils'

const showErrorMsg = (msg) => {
  uni.showToast({
    title: msg,
    icon: 'none',
    position: 'bottom'
  })
}
const BASE_URL = getServerUrl()
// const BASE_URL = 'http://119.91.97.176:8080'
// const BASE_URL = 'http://10.181.216.32:8080'
/**
 * 任务管理器
 */
const missionManager = {
  /**
   * 任务列表
   * @type {Map<string, Object>}
   */
  manager: new Map(),
  /**
   * 添加一个任务, 根据拒绝策略, 可能会拒绝该任务
   * @param {string} url
   * @param {'REJECT_IF_EXIST' | 'CANCEL_OLD_TASK' | 'NO_POLICY'} policy 拒绝策略
   */
  checkMission(url, policy) {
    // const noParamUrl = getNoParamUrl(url)
    const task = missionManager.manager.get(url)
    if (task != null) {
      if (policy === 'CANCEL_OLD_TASK') {
        task.abort()
      } else if (policy === 'REJECT_IF_EXIST') {
        throw `the request: ${url} is rejected because of the RejectPolicy`
      }
    }
  },
  /**
   * 移除一个任务
   * @param {string} url 任务url
   */
  removeMission(url) {
    missionManager.manager.delete(url)
  },
  /**
   * 添加一个任务
   * @param {string} url 任务url
   * @param {Object} task
   */
  addMission(url, task) {
    missionManager.manager.set(url, task)
  }
}


/**
 * @param {ajaxConfig} config
 */
function baseAjax(config) {
  return new Promise((resolve, reject) => {
    const url = config.url.startsWith('http') ? config.url : BASE_URL + config.url

    if (config.method === 'POST') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded'
    }
    missionManager.checkMission(url, config.rejectPolicy ? config.rejectPolicy : 'REJECT_IF_EXIST')
    console.log('mark')
    const task = uni.request({
      url,
      data: config.data,
      method: config.method ? config.method : 'GET',
      sslVerify: false,
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62',
        // 'Authorization': token ? token : '',
        // eslint-disable-next-line
        ...config.headers
      },
      complete() {
        missionManager.removeMission(url)
      },
      success({ data }) {
        resolve(data)
      },
      fail(e) {
        reject(e)
      }
    })
    missionManager.addMission(url, task)
  })
}

/**
 * 快速发起请求
 * @param url 请求url
 * @param data 请求数据
 * @param {'GET' | 'POST'} method 请求方法
 * @return {Promise<unknown>}
 */
export function noRepeatAjax(url, method = 'GET', data = {}) {
  return baseAjax({
    url,
    data,
    method,
    rejectPolicy: 'REJECT_IF_EXIST'
  })
}

export function cancelOldAjax(url, method = 'GET', data = {}) {
  return baseAjax({
    url,
    data,
    method,
    rejectPolicy: 'CANCEL_OLD_TASK'
  })
}

export function sessionAjax(url, session, method = 'GET', data = {}) {
  return baseAjax({
    url,
    data,
    method,
    rejectPolicy: 'CANCEL_OLD_TASK',
    headers: {
      Cookie: 'JSESSIONID=' + session
    }
  })
}

export default baseAjax
