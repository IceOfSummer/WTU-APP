import { noRepeatAjax } from '../../hook/ajax'

/**
 * 初始化选课
 * @param username {string} 用户名
 * @param token {string} token
 */
export const initClassSelect = (username, token) => noRepeatAjax('/wtu/eduSystem/class/init', 'GET', { username, token })

export const initClassSelect2 = (id, xszxzt, username, token) => noRepeatAjax('/wtu/eduSystem/class/query/init', 'GET', { username, token, id, xszxzt })



/**
 * 获取课程列表
 * @param store {Store}
 * @param year {number} 要查询的学年
 * @param page {number} 查第几页
 * @return {Promise<unknown>}
 */
export const getClassList = (store, year, page = 1) => noRepeatAjax('/wtu/eduSystem/class/query', 'GET', {
  year,
  page,
  username: store.state.eduSystemUser.username,
  token: store.state.eduSystemUser.token,
  'njdm_id_list[0]': year,
  rwlx: store.state.classSelectInfo.queryParam2.rwlx,
  xkly: store.state.classSelectInfo.queryParam2.xkly,
  bklx_id: store.state.classSelectInfo.queryParam2.bklx_id,
  sfkkjyxdxnxq: store.state.classSelectInfo.queryParam2.sfkkjyxdxnxq,
  xqh_id: store.state.classSelectInfo.queryParam1.xqh_id,
  jg_id: store.state.classSelectInfo.queryParam1.jg_id,
  zyh_id: store.state.classSelectInfo.queryParam1.zyh_id,
  zyfx_id: store.state.classSelectInfo.queryParam1.zyfx_id,
  njdm_id: store.state.classSelectInfo.queryParam1.njdm_id,
  bh_id: store.state.classSelectInfo.queryParam1.bh_id,
  xbm: store.state.classSelectInfo.queryParam1.xbm,
  xslbdm: store.state.classSelectInfo.queryParam1.xslbdm,
  ccdm: store.state.classSelectInfo.queryParam1.ccdm,
  xsbj: store.state.classSelectInfo.queryParam1.xsbj,
  sfkknj: store.state.classSelectInfo.queryParam2.sfkknj,
  sfkkzy: store.state.classSelectInfo.queryParam2.sfkkzy,
  kzybkxy: store.state.classSelectInfo.queryParam2.kzybkxy,
  sfznkx: store.state.classSelectInfo.queryParam2.sfznkx,
  zdkxms: store.state.classSelectInfo.queryParam2.zdkxms,
  sfkxq: store.state.classSelectInfo.queryParam2.sfkxq,
  sfkcfx: store.state.classSelectInfo.queryParam2.sfkcfx,
  kkbk: store.state.classSelectInfo.queryParam2.kkbk,
  kkbkdj: store.state.classSelectInfo.queryParam2.kkbkdj,
  sfkgbcx: store.state.classSelectInfo.queryParam2.sfkgbcx,
  sfrxtgkcxd: store.state.classSelectInfo.queryParam2.sfrxtgkcxd,
  tykczgxdcs: store.state.classSelectInfo.queryParam2.tykczgxdcs,
  xkxnm: store.state.classSelectInfo.queryParam1.xkxnm,
  xkxqm: store.state.classSelectInfo.queryParam1.xkxqm,
  kklxdm: store.state.classSelectInfo.queryParam1.kklxdm,
  rlkz: store.state.classSelectInfo.queryParam2.rlkz,
  xkzgbj: store.state.classSelectInfo.queryParam2.xkzgbj,
  kspage: page,
  jspage: 15
})
