import { noRepeatAjax } from '../hook/ajax'

import manifest from './../manifest.json'

/**
 * 获取版本号
 * @return {Promise<{data: {versionCode: number, versionName: string, size: number}}>}
 */
export const getVersion = () => noRepeatAjax(manifest.updateServerUrl + '/info/wgt')
