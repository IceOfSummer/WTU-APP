<template>
  <view class="config-center">
    <view class="config-center-split-line"></view>
    <options-block title="课程表设置" @click="jump('/pages/Classes/Options/Options')">
      <template #right>
        <view class="config-center-right-arrow"></view>
      </template>
    </options-block>
    <view class="config-center-split-line"></view>
    <options-block title="教务系统设置" @click="jump('/pages/Profile/EducationSystem/EducationSystem')">
      <template #right>
        <view class="config-center-right-arrow"></view>
      </template>
    </options-block>
  </view>
</template>

<script>
import OptionsBlock from '../../../component/OptionsBlock/OptionsBlock'
export default {
  name: 'ConfigCenter',
  components: { OptionsBlock },
  setup () {
    const jump = (url) => uni.navigateTo({ url })
    return {
      jump
    }
  }
}
</script>

<style lang="scss">
.config-center-right-arrow{
  @include right-arrow(#999, 13rpx)
}
.config-center-split-line{
  @include split-line($uni-bg-color-grey, 750rpx)
}
.config-center{
  background-color: #fff;
}
</style>
