import { noRepeatAjax } from '../hook/ajax'

/**
 * 初始化登录请求
 * @return {Promise<unknown>}
 */
export const init = () => noRepeatAjax('/auth/init')

/**
 * 获取验证码
 * @param session 验证码
 * @return {Promise<unknown>} 图形验证码
 */
export const getCaptcha = (session) => noRepeatAjax('/auth/captcha', 'GET', { session })

export const login = (username, password, captcha, session) => noRepeatAjax('/auth/login', 'POST', { username, password, captcha, session })
