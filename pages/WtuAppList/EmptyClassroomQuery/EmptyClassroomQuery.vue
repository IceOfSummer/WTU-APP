<template>
  <view class="empty-classroom-query">
    <options-picker title="选择学年" :range="yearRange" v-model="curYearSelect">
      {{yearRange[curYearSelect]}}
    </options-picker>
    <options-divider/>
    <options-picker title="选择教室" :range="classPosRange" v-model="curClassPosSelect">
      {{classPosRange[curClassPosSelect]}}
    </options-picker>
    <options-divider/>
    <animated-collapse title="选择查询周(默认选择本周)">
      <line-check-box-group :titles="[`第${curWeek}周`, `第${curWeek + 1}周`, `第${curWeek + 2}周`]"
                            :default-select="[0]" :weight="[curWeek - 1, curWeek , curWeek + 1]" v-model="selectedWeek"/>
      <view class="empty-classroom-query-week-tip">
        <text>若没有找到您想要的周数,请前往课程表设置当前周</text>
      </view>
    </animated-collapse>
    <options-divider/>
    <animated-collapse title="选择星期(默认选中今天)">
      <line-check-box-group :titles="['周一', '周二', '周三', '周四', '周五', '周六', '周日']"
                            :default-select="[getCurDay() - 1]" :weight="[0, 1, 2, 3, 4, 5, 6]" v-model="selectedDay"/>
    </animated-collapse>
    <options-divider/>
    <animated-collapse title="选择上课时间" :open="true">
      <line-check-box-group :titles="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']"
                            :weight="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]" v-model="selectedClassTime"/>
    </animated-collapse>
    <options-divider/>
    <options-button @click="tryQuery">查询</options-button>
    <view class="empty-classroom-query-week-tip">
      <text>暂时仅支持阳光校区使用</text>
    </view>
  </view>
</template>

<script>
import OptionsPicker from '../../../component/OptionsComponent/OptionsPicker/OptionsPicker'
import { computed, ref } from 'vue'
import OptionsDivider from '../../../component/OptionsComponent/OptionsDivider/OptionsDivider'
import AnimatedCollapse from '../../../component/AnimatedCollapse/AnimatedCollapse'
import LineCheckBoxGroup from './LineCheckBoxGroup'
import { getCurDay } from '../../../hook/utils/DateUtils'
import { useStore } from 'vuex'
import OptionsButton from '../../../component/OptionsComponent/OptionsButton/OptionsButton'
import { showToast } from '../../../hook/utils/TipUtils'
import { PROXY_SCHOOL_APP_AJAX } from '../../../store/actions-type'
import { getEmptyClassroom } from '../../../api/schoolApp'
export default {
  name: 'EmptyClassroomQuery',
  components: { OptionsButton, LineCheckBoxGroup, AnimatedCollapse, OptionsDivider, OptionsPicker },
  setup () {
    const store = useStore()

    const cur = new Date()
    const curYear = cur.getFullYear()

    // 选择学年可用的范围
    const yearRange = [curYear - 2 ,curYear - 1, curYear, curYear + 1, curYear + 2]
    // 当前选中的学年
    const curYearSelect = ref(2)

    // 上课地点可用范围 全部->空  YG体-> YGti  YG图 -> YGtu
    const classPosRange = ['全部', 'YG03', 'YG04', 'YG05', 'YG06', 'YG07', 'YG08', 'YG09', 'YG体', 'YG图']
    // 传参时所用的字符串
    const paramMapOfClassPosRange = ['0', 'YG03', 'YG04', 'YG05', 'YG06', 'YG07', 'YG08', 'YG09', 'YGti', 'YGtu']
    // 当前选中的查询地点
    const curClassPosSelect = ref(0)

    // 要查询的周
    const selectedWeek = ref(0)

    // 要查询的星期
    const selectedDay = ref(0)

    // 要查询的上课时间
    const selectedClassTime = ref(0)

    /**
     * 检查表单是否有效，如没有填写某个值
     * @return {boolean} 返回true表示有效
     */
    const preCheckFrom = () => {
      if (selectedWeek.value === 0) {
        showToast('请选择要查询的周')
      } else if (selectedDay.value === 0) {
        showToast('请选择要查询的星期')
      } else if (selectedClassTime.value === 0) {
        showToast('请选择上课时间')
      } else {
        return true
      }
      return false
    }

    const tryQuery = () => {
      if (preCheckFrom()) {

        /**
         * 将选中的星期转换为字符串
         */
        let tempDayStr = ''
        for (let i = 0; i < 7; i++) {
          if ((selectedDay.value >> i & 1) === 1) {
            // 该星期被选中
            tempDayStr += (i + 1) + ','
          }
        }
        // 替换最后多余的逗号
        const dayStr = tempDayStr.substr(0, tempDayStr.length - 1)

        store.dispatch(PROXY_SCHOOL_APP_AJAX,  getEmptyClassroom(yearRange[curYearSelect.value], paramMapOfClassPosRange[curClassPosSelect.value], selectedWeek.value,
          dayStr, selectedClassTime.value, store.state.eduSystemUser.token)).then(resp => {
          console.log(resp)
        })
      }

    }

    return {
      yearRange: yearRange,
      curYearSelect: curYearSelect,
      classPosRange,
      curClassPosSelect,
      curWeek: computed(() => store.state.classes.classesOptions.curWeek),
      selectedWeek,
      selectedDay,
      selectedClassTime,
      tryQuery
    }

  },
  methods: {
    getCurDay
  }
}
</script>

<style lang="scss">
.empty-classroom-query-btn{
  width: 630rpx;
  height: 98rpx;
  border-radius: 49rpx;
  margin-top: 30rpx;
  color: #fff;
  border: none;
  transition: background-color 0.3s;
  background-color: $uni-color-primary;
}
.empty-classroom-query-week-tip{
  font-size: 16rpx;
  text-align: center;
  color: $uni-text-color-grey;
}
.empty-classroom-query{
  padding-bottom: 30rpx;
  background-color: #fff;
}
</style>
