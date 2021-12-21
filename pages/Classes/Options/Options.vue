<template>
  <view class="classes-option">
    <options-picker :range="['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周',
  '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周']"
                    title="选择当前周" @change="selectWeek">第{{curWeek}}周</options-picker>
    <options-divider/>
    <options-picker :range="yearData" @change="selectYear" :model-value="yearData.indexOf(year)" title="选择学年">{{year}}年</options-picker>
    <options-divider/>
    <options-picker :range="termData" @change="selectTerm" :model-value="term - 1" title="选择学期">{{ termData[term - 1] }}</options-picker>
    <options-divider/>
    <options-switch title="隐藏已经结课的课程" v-model="hideFinishedClass"/>
    <options-divider/>
    <options-block title="设置背景图" @click="selectBackgroundImage"></options-block>
    <options-divider/>
    <options-block title="从服务器校准当前周" @click="tryAdjustCurWeekFromServer" type="primary"/>
    <options-divider/>
    <options-block @click="clearClassData" type="danger" title="情况本地课表缓存数据"/>
    <options-divider/>
    <options-block title="重置背景图片" type="danger" @click="resetBackgroundImage"></options-block>
    <options-divider/>
  </view>
</template>

<script>
import OptionsSwitch from '../../../component/OptionsComponent/OptionsSwitch/OptionsSwitch'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { SET_CLASSES, SET_CLASSES_OPTIONS } from '../../../store/mutations-type'
import { ADJUST_CUR_WEEK_FROM_SERVER } from '../../../store/actions-type'
import OptionsBlock from '../../../component/OptionsComponent/OptionsBlock/OptionsBlock'
import OptionsPicker from '../../../component/OptionsComponent/OptionsPicker/OptionsPicker'
import OptionsDivider from '../../../component/OptionsComponent/OptionsDivider/OptionsDivider'

export default {
  name: 'ClassesOptions',
  components: { OptionsDivider, OptionsPicker, OptionsBlock, OptionsSwitch },
  setup() {
    const store = useStore()
    const hideFinishedClass = ref(!!store.state.classes.classesOptions.hideClosedClasses)

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

    const selectBackgroundImage = () => {
      uni.chooseImage({
        count: 1,
        success ({ tempFilePaths }) {
          uni.saveFile({
            tempFilePath: tempFilePaths[0],
            success ({ savedFilePath }) {
              store.commit(SET_CLASSES_OPTIONS, { key: 'backgroundImagePath', value: savedFilePath })
              uni.showToast({
                title: '更换成功',
                icon: 'none',
                position: 'bottom'
              })
            }
          })
        }
      })
    }

    const resetBackgroundImage = () => {
      uni.showModal({
        title: '重置背景图片',
        content: '确定要重置背景图片吗?',
        success({ confirm }) {
          if (confirm) {
            store.commit(SET_CLASSES_OPTIONS, { key: 'backgroundImagePath', value: '' })
            uni.showToast({
              title: '重置成功',
              icon: 'none',
              position: 'bottom'
            })
          }
        }
      })
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
      termData,
      selectBackgroundImage,
      resetBackgroundImage
    }
  }
}
</script>

<style lang="scss">
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
