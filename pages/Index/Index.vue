<template>
  <view class="content">
    <text>目前仅支持课程表功能, 点击个人中心 -> 教务系统登录后即可查看课程表</text>
    <text>课程表下拉可以刷新, 使用前需要在右上角设置相关参数</text>
    <text>Android直接添加桌面小部件(类似超级课程表一样的)</text>
    <text>IOS出于经济(要MacBook才能开发)和能力(要用Objective-C)暂不支持添加桌面小部件</text>
    <text>IOS由于我自己无法调试(搞不了苹果虚拟机), 所以出问题了基本很难修复</text>
    <text>个人建议IOS还是用超级课程表吧(穷b玩不起IOS 2333)</text>
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
