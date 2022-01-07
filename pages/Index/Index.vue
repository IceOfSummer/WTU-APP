<template>
  <view class="content">
    <status-bar/>
    <my-navigator title="首页"/>
    <text>选课工具仍然是测试版!</text>
    <text>选完后一定要去教务系统确认</text>
    <text>当前版本: {{version}}</text>
  </view>
</template>

<script>
import manifest from '../../manifest.json'
import MyNavigator from '../../component/Navigator/Navigator'
import StatusBar from '../../component/Navigator/StatusBar'
export default {
  name: 'HomeIndex',
  components: { StatusBar, MyNavigator },
  setup() {
    return {
      version: manifest.versionName
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
}
</style>
