<template>
  <view>
    <status-bar/>
    <my-navigator title="首页"/>
    <view class="content">
      <text>感谢您使用本APP!</text>
      <text>APP代码全部开源且遵守MIT开源协议</text>
      <text>目前仅有4个功能即</text>
      <text>查询课程表, 查询空教室, 查询成绩和选课工具</text>
      <text>还有很多功能想做, 但有没有那个力气就是另一回事了</text>
      <text>tip: 可以在桌面添加课程表小部件!</text>
      <text>当前版本: {{version}}</text>
    </view>
    <view class="fast-links">
      <view>
        <text @click="jumpToBrowser('https://github.com/HuPeng333/WTU-APP')">点我查看APP代码仓库</text>
      </view>
      <view>
        <text @click="jumpToBrowser('https://github.com/HuPeng333/WTU-App-Server')"><del>点我查看APP后端代码仓库(已废弃)</del></text>
      </view>
    </view>
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
    const jumpToBrowser = (url) => {
      plus.runtime.openURL(url)
    }

    return {
      version: manifest.versionName,
      jumpToBrowser
    }
  }
}
</script>

<style lang="scss">
.fast-links{
  margin-top: 40rpx;
  >view {
    text-align: center;
    margin: 20rpx 0;
  }
  color: $uni-color-primary;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: $uni-font-size-sm;
}
</style>
