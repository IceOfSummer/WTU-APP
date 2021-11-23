import { noRepeatAjax } from '../hook/ajax'

/**
 * 初始化登录请求
 * @return {Promise<unknown>}
 */
export const init = () => noRepeatAjax('/school/auth/init')

/**
 * 获取验证码
 * @param session {string}
 * @param lt {string}
 * @param route {string}
 * @return {Promise<unknown>}
 */
export const getCaptcha = (session, lt, route) => noRepeatAjax('/school/auth/captcha', 'GET', { session, lt, route })

/**
 * 登录
 * @param session {string}
 * @param lt {string}
 * @param password {string}
 * @param captcha {string}
 * @param route {string}
 * @param username {string}
 * @return {Promise<unknown>}
 */
export const login = (session, lt, password, captcha, route, username) =>
  noRepeatAjax('/school/auth/login', 'POST', { session, lt, password, captcha, route, username })
