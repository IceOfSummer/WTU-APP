export default {
  /**
   * 登录token
   */
  token: '',
  /**
   * 课表
   */
  classes: {
    /**
     * 课表信息
     */
    list: [],
    /**
     * 课表的设置
     */
    classesOptions: {
      /**
       * 当前是第几周
       */
      curWeek: 0,
      /**
       * curWeek上次更新时间 Date对象
       */
      curWeekLastUpdate: '',
      /**
       * 隐藏已经结课的课程
       */
      hideClosedClasses: false,
      /**
       * 入学年份
       */
      year: 0,
      /**
       * 哪个学期
       */
      term: 0,
      /**
       * 背景图片url
       */
      backgroundImagePath: ''
    }
  },
  /**
   * 用户信息
   */
  user: {
    /**
     * 头像(存储base64)
     */
    headIcon: ''
  },
  /**
   * 教务系统信息
   */
  eduSystemUser: {
    /**
     * 用户名
     */
    username: '',
    /**
     * 密码
     */
    password: '',
    /**
     * 登录成功的token
     */
    token: '',
    /**
     * token是否有效
     */
    isUsableToken: false,
    /**
     * 设置
     */
    config: {
      /**
       * 是否在登录过期后自动跳转到登录页面
       */
      autoRedirectLoginPage: false
    }
  },
  /**
   * 选课系统缓存信息
   */
  classSelectInfo: {
    /**
     * 查询课程时所用参数
     */
    queryParam1: {
      xqh_id: '',
      // jg_id在input中name为jg_id_1
      jg_id: '',
      zyh_id: '',
      zyfx_id: '',
      njdm_id: '',
      bh_id: '',
      xbm: '',
      xslbdm: '',
      ccdm: '',
      xsbj: '',
      xkxnm: '',
      xkxqm: '',
      xszxzt: '',
      kklxdm: '',
      xkkz_id: ''
    },
    queryParam2: {
      rwlx: '',
      xkly: '',
      bklx_id: '',
      sfkkjyxdxnxq: '',
      sfkknj: '',
      sfkkzy: '',
      kzybkxy: '',
      sfznkx: '',
      zdkxms: '',
      sfkxq: '',
      sfkcfx: '',
      kkbk: '',
      kkbkdj: '',
      sfkgbcx: '',
      sfrxtgkcxd: '',
      tykczgxdcs: '',
      rlkz: '',
      xkzgbj: '',
      rlzlkz: '',
      xklc: ''
    },
    /**
     * 选择课程时所用参数
     */
    selectInfo: ''
  }
}
