<template>
  <view class="content">
    <text>选课工具仍然是测试版!</text>
    <text>选完后一定要去教务系统确认</text>
    <text>当前版本: {{version}}</text>
  </view>
</template>

<script>
import manifest from '../../manifest.json'
export default {
  name: 'HomeIndex',
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

.logo {
  height: 200 rpx;
  width: 200 rpx;
  margin: 200 rpx auto 50 rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36 rpx;
  color: #8f8f94;
}
</style>
