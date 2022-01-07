<template>
  <view>
    <status-bar/>
    <my-navigator title="设置" show-back/>
    <view class="config-center">
      <options-block title="课程表设置" @click="jump('/pages/Classes/Options/Options')">
        <template #right>
          <view class="config-center-right-arrow"></view>
        </template>
      </options-block>
      <options-divider/>
      <options-block title="教务系统设置" @click="jump('/pages/Profile/EducationSystem/EducationSystem')">
        <template #right>
          <view class="config-center-right-arrow"></view>
        </template>
      </options-block>
    </view>
  </view>
</template>

<script>
import OptionsBlock from '../../../component/OptionsComponent/OptionsBlock/OptionsBlock'
import OptionsDivider from '../../../component/OptionsComponent/OptionsDivider/OptionsDivider'
import MyNavigator from '../../../component/Navigator/Navigator'
import StatusBar from '../../../component/Navigator/StatusBar'
export default {
  name: 'ConfigCenter',
  components: { StatusBar, MyNavigator, OptionsDivider, OptionsBlock },
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
.config-center{
  background-color: #fff;
}
</style>
