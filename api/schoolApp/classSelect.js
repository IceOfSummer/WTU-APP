import { noRepeatAjax } from '../../hook/ajax'

/**
 * 初始化选课
 * @param username {string} 用户名
 */
export const initClassSelect = (username) =>
  noRepeatAjax(`http://jwglxt.wtu.edu.cn/xsxk/zzxkyzb_cxZzxkYzbIndex.html?gnmkdm=N253512&layout=default&su=${username}`, 'GET')

export const initClassSelect2 = (store, xkkz_id) =>
  noRepeatAjax(`http://jwglxt.wtu.edu.cn/xsxk/zzxkyzb_cxZzxkYzbDisplay.html?gnmkdm=N253512&su=${store.state.eduSystemUser.username}`, 'POST', {
  xkkz_id,
  xszxzt: store.state.classSelectInfo.queryParam1.xszxzt,
  kspage: '0',
  jspage: '0'
})



/**
 * 获取课程列表
 * @param store {Store}
 * @param queryParam {Object} 查询参数
 * @param kklxdm {string} 10:通识选修课, 06:体育课, 07: 英语分项
 * @param page {number} 查第几页
 * @return {Promise<unknown>}
 */
export const getClassList = (store, queryParam , kklxdm, page = 1) =>
  noRepeatAjax(`http://jwglxt.wtu.edu.cn/xsxk/zzxkyzb_cxZzxkYzbPartDisplay.html?gnmkdm=N253512&su=${store.state.eduSystemUser.username}`, 'POST', {
  rwlx: queryParam.rwlx,
  xkly: queryParam.xkly,
  bklx_id: queryParam.bklx_id,
  sfkkjyxdxnxq: queryParam.sfkkjyxdxnxq,
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
  sfkknj: queryParam.sfkknj,
  sfkkzy: queryParam.sfkkzy,
  kzybkxy: queryParam.kzybkxy,
  sfznkx: queryParam.sfznkx,
  zdkxms: queryParam.zdkxms,
  sfkxq: queryParam.sfkxq,
  sfkcfx: queryParam.sfkcfx,
  kkbk: queryParam.kkbk,
  kkbkdj: queryParam.kkbkdj,
  sfkgbcx: queryParam.sfkgbcx,
  sfrxtgkcxd: queryParam.sfrxtgkcxd,
  tykczgxdcs: queryParam.tykczgxdcs,
  xkxnm: store.state.classSelectInfo.queryParam1.xkxnm,
  xkxqm: store.state.classSelectInfo.queryParam1.xkxqm,
  kklxdm,
  rlkz: queryParam.rlkz,
  xkzgbj: queryParam.xkzgbj,
  kspage: 15 * (page - 1) + 1,
  jspage: 15 * page,
  jxbzb: ''
})


export const getClassDetail = (store, year, cxbj, fxbj, kch_id, xkkz_id, kklxdm, queryParam) =>
  noRepeatAjax(`http://jwglxt.wtu.edu.cn/xsxk/zzxkyzbjk_cxJxbWithKchZzxkYzb.html?gnmkdm=N253512&su=${store.state.eduSystemUser.username}`, 'POST', {
  rwlx: queryParam.rwlx,
  xkly: queryParam.xkly,
  bklx_id: queryParam.bklx_id,
  sfkkjyxdxnxq: queryParam.sfkkjyxdxnxq,
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
  sfkknj: queryParam.sfkknj,
  sfkkzy: queryParam.sfkkzy,
  kzybkxy: queryParam.kzybkxy,
  sfznkx: queryParam.sfznkx,
  zdkxms: queryParam.zdkxms,
  sfkxq: queryParam.sfkxq,
  sfkcfx: queryParam.sfkcfx,
  kkbk: queryParam.kkbk,
  kkbkdj: queryParam.kkbkdj,
  xkxnm: store.state.classSelectInfo.queryParam1.xkxnm,
  xkxqm: store.state.classSelectInfo.queryParam1.xkxqm,
  rlkz: queryParam.rlkz,
  kklxdm,
  kch_id,
  xkkz_id,
  cxbj,
  fxbj
})

export const selectClass = (store, jxb_id, kch_id, kcmc, xkkz_id, queryParam) =>
  noRepeatAjax(`http://jwglxt.wtu.edu.cn/xsxk/zzxkyzbjk_xkBcZyZzxkYzb.html?gnmkdm=N253512&su=${store.state.eduSystemUser.username}`, 'POST', {
  jxb_ids: jxb_id,
  kch_id,
  kcmc,
  rwlx: queryParam.rwlx,
  rlkz: queryParam.rlkz,
  rlzlkz: queryParam.rlzlkz,
  sxbj: (queryParam.rlkz || queryParam.rlzlkz ? '1' : '0'),
  // xxkbj: 是否有先行课
  xxkbj: 0,
  // qz: 权重
  qz: 0,
  // cxbj: 是否重修
  cxbj: 0,
  xkkz_id,
  njdm_id: store.state.classSelectInfo.queryParam1.njdm_id,
  zyh_id: store.state.classSelectInfo.queryParam1.zyh_id,
  kklxdm: store.state.classSelectInfo.queryParam1.kklxdm,
  xklc: queryParam.xklc,
  xkxnm: store.state.classSelectInfo.queryParam1.xkxnm,
  xkxqm: store.state.classSelectInfo.queryParam1.xkxqm
})
