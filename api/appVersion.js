import { noRepeatAjax } from '../hook/ajax'

/**
 * 获取版本号
 * @return {Promise<{data: {versionCode: number, versionName: string}}>}
 */
export const getVersion = () => noRepeatAjax('/version/')
