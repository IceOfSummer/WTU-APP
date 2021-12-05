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
      term: 1
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
    isUsableToken: false
  }
}
