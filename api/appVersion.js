import { noRepeatAjax } from '../hook/ajax'

/**
 * 获取版本号
 * @return {Promise<{data: {versionCode: number, versionName: string, size: number}}>}
 */
export const getVersion = () => noRepeatAjax('/vcs/info/wgt')

