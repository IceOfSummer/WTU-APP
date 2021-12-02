<template>
  <view class="classes-option">
    <options-switch v-model="hideFinishedClass" title="隐藏已经结课的课程"/>
    <picker :range="['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周',
    '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周']"
            @change="selectWeek" :value="curWeek">
      <view class="options-block">
        <text>选择当前周</text>
        <text>第{{curWeek + 1}}周</text>
      </view>
    </picker>
  </view>
</template>

<script>
import OptionsSwitch from '../../../component/OptionsSwitch/OptionsSwitch'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { SET_CLASSES_OPTIONS } from '../../../store/mutations-type'
export default {
  name: 'ClassesOptions',
  components: { OptionsSwitch },
  setup () {
    const store = useStore()
    const hideFinishedClass = ref(store.state.classes.classesOptions.hideClosedClasses)

    watch(hideFinishedClass, () => {
      store.commit(SET_CLASSES_OPTIONS, { key: 'hideClosedClasses', value: hideFinishedClass.value })
      console.log(store.state.classes.classesOptions)
    })

    const selectWeek = (event) => {
      store.commit(SET_CLASSES_OPTIONS, { key: 'curWeek', value: event.detail.value })
    }
    return {
      hideFinishedClass,
      selectWeek,
      curWeek: computed(() => store.state.classes.classesOptions.curWeek)
    }
  }
}
</script>

<style lang="scss">
.options-block > text:last-child{
  color: $uni-color-primary;
}
.classes-option-picker{
  width: 100rpx;
}
.classes-option{
  padding-top: 10rpx;
  background-color: #fff;
}
.options-block-text{
  color: $uni-text-color-grey;
  font-size: 20px;
}
</style>
