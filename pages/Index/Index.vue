<template>
  <view class="content">
    <text>目前已经支持所有功能(除了选课工具,该应用将之后制作)</text>
    <text>课程表可用添加桌面小部件</text>
    <text>课程表桌面小部件每次可能需要手动刷新!</text>
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
