import { noRepeatAjax } from '../../hook/ajax'
import { getInputValue } from '../../hook/utils/StringUtils'

/**
 * 初始化登录请求, 如果登录了返回null
 * @return {Promise<unknown>}
 */
export const init = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'https://auth.wtu.edu.cn/authserver/login?service=http%3A%2F%2Fjwglxt.wtu.edu.cn%2Fsso%2Fjziotlogin',
      success ({ data }) {
        let salt = ''
        const lt = getInputValue(data, 'lt')
        const match = data.match(/var pwdDefaultEncryptSalt = ".+"/)
        if (!match) {
          // 登录了
          resolve(null)
          return
        }
        salt = match[0]
        salt = salt.replace('var pwdDefaultEncryptSalt = ', '').replace(/"/g, '')
        const execution = getInputValue(data, 'execution')
        resolve({
          encryptSalt: salt,
          lt,
          execution
        })
      },
      fail (e) {
        reject(e)
      }
    })
  })
}

/**
 * 获取验证码
 * @return {Promise<unknown>}
 */
export const getCaptcha = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'https://auth.wtu.edu.cn/authserver/captcha.html?ts=224',
      responseType: 'arraybuffer',
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62'
      },
      success ({ data }) {
        resolve(data)
      },
      fail (e) {
        reject(e)
      }
    })
  })
}


/**
 * 登录
 * @param lt {string}
 * @param password {string}
 * @param captcha {string}
 * @param username {string}
 * @param execution {string}
 * @return {Promise<unknown>}
 */
export const login = (lt, password, captcha, username, execution) => {
  return new Promise((resolve, reject) => {
    noRepeatAjax('https://auth.wtu.edu.cn/authserver/login?service=http%3A%2F%2Fjwglxt.wtu.edu.cn%2Fsso%2Fjziotlogin', 'POST', {
      username,
      password,
      captchaResponse: captcha,
      rememberMe: 'on',
      lt,
      dllt: 'userNamePasswordLogin',
      execution,
      _eventId: 'submit',
      rmShown: 1
    }).then(data => resolve(data)).catch(e => reject(e))
  })
}

/**
 * 获取用户信息
 * @param username {string} 用户名
 */
export const getUserInfo = (username) => noRepeatAjax(`http://jwglxt.wtu.edu.cn/xsxxxggl/xsgrxxwh_cxXsgrxx.html?gnmkdm=N100801&layout=default&su=${username}`,
  'GET')


