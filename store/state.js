export default {
  /**
   * 登录token
   */
  token: '',
  /**
   * 教务系统token
   */
  schoolToken: '',
  /**
   * 学校的用户名
   */
  schoolUsername: '',
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
       * 隐藏已经结课的课程
       */
      hideClosedClasses: false
    }
  }
}
