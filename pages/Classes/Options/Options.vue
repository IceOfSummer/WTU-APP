<template>
  <view class="classes-option">
    <picker :range="['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周',
  '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周']"
            @change="selectWeek" :value="curWeek - 1" class="options-block">
      <text>选择当前周</text>
      <text>第{{ curWeek }}周</text>
    </picker>
    <view class="option-split-line"></view>
    <picker :range="yearData" @change="selectYear" :value="yearData.indexOf(year)" class="options-block">
      <text>选择学年</text>
      <text>{{ year }}年</text>
    </picker>
    <view class="option-split-line"></view>
    <picker :range="termData" @change="selectTerm" :value="term - 1" class="options-block">
      <text>选择学期</text>
      <text>{{ termData[term - 1] }}</text>
    </picker>
    <view class="option-split-line"></view>
    <view>
      <options-switch v-model="hideFinishedClass" title="隐藏已经结课的课程"/>
    </view>
    <view class="option-split-line"></view>
    <view class="options-block options-cur-week" @click="tryAdjustCurWeekFromServer">
      <text>从服务器校准当前周</text>
    </view>
    <view class="option-split-line"></view>
    <view class="options-block" @click="clearClassData">
      <text style="color: #dd524d">清空本地课表缓存数据</text>
    </view>
  </view>
</template>

<script>
import OptionsSwitch from '../../../component/OptionsSwitch/OptionsSwitch'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { SET_CLASSES, SET_CLASSES_OPTIONS } from '../../../store/mutations-type'
import { ADJUST_CUR_WEEK_FROM_SERVER } from '../../../store/actions-type'

export default {
  name: 'ClassesOptions',
  components: { OptionsSwitch },
  setup() {
    const store = useStore()
    const hideFinishedClass = ref(store.state.classes.classesOptions.hideClosedClasses)

    watch(hideFinishedClass, () => {
      store.commit(SET_CLASSES_OPTIONS, { key: 'hideClosedClasses', value: hideFinishedClass.value })
    })

    const selectWeek = (event) => {
      store.commit(SET_CLASSES_OPTIONS, { key: 'curWeek', value: event.detail.value + 1 })
    }

    const yearData = ref([2018, 2019, 2020, 2021, 2022, 2023])

    const selectYear = (event) => {
      store.commit(SET_CLASSES_OPTIONS, { key: 'year', value: yearData.value[event.detail.value] })
    }

    const termData = ref(['上学期', '下学期'])

    const selectTerm = (event) => {
      store.commit(SET_CLASSES_OPTIONS, { key: 'term', value: event.detail.value + 1 })
    }

    /**
     * 从服务器校准当前周
     */
    const tryAdjustCurWeekFromServer = () => {
      uni.showModal({
        title: '校准当前周',
        content: '确定要从服务器校准当前周吗?',
        success({ confirm }) {
          if (confirm) {
            store.dispatch(ADJUST_CUR_WEEK_FROM_SERVER).then(() => {
              uni.showToast({
                title: '校准成功',
                icon: 'none',
                position: 'bottom'
              })
            }).catch(() => {
              uni.showToast({
                title: '校准失败,请稍后重试',
                icon: 'none',
                position: 'bottom'
              })
            })
          }
        }
      })
    }

    /**
     * 清除本地课表缓存数据
     */
    const clearClassData = () => {
      uni.showModal({
        title: '清除数据',
        content: '确定要清除本地课表数据吗',
        success({ confirm }) {
          if (confirm) {
            store.commit(SET_CLASSES, [])
            uni.showToast({
              title: '清除成功',
              icon: 'none',
              position: 'bottom'
            })
          }
        }
      })
    }

    return {
      hideFinishedClass,
      selectWeek,
      curWeek: computed(() => store.state.classes.classesOptions.curWeek),
      year: computed(() => store.state.classes.classesOptions.year),
      term: computed(() => store.state.classes.classesOptions.term),
      tryAdjustCurWeekFromServer,
      clearClassData,
      selectYear,
      selectTerm,
      yearData,
      termData
    }
  }
}
</script>

<style lang="scss">
.options-block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  > text{
    color: $uni-text-color-grey;
    font-size: 24rpx;
  }
}
.option-split-line{
  @include split-line($uni-bg-color-grey, 750rpx)
}
.options-cur-week {
  color: $uni-color-primary;
}
.options-block > text:last-child {
  color: $uni-color-primary;
}
.classes-option {
  padding-top: 10rpx;
  background-color: #fff;
}

.options-block-text {
  color: $uni-text-color-grey;
  font-size: 24rpx;
}
</style>
