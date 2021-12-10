<template>
  <view class="wtu-app">
    <wtu-app-list-block title="推荐">
      <wtu-app-list-block-item title="查询空闲教室">&#xe661;</wtu-app-list-block-item>
      <wtu-app-list-block-item title="成绩查询">&#xe65e;</wtu-app-list-block-item>
      <wtu-app-list-block-item title="选课工具">&#xe668;</wtu-app-list-block-item>
      <wtu-app-list-block-item title="登录教务系统">&#xe67a;</wtu-app-list-block-item>
    </wtu-app-list-block>
  </view>
</template>

<script>
import WtuAppListBlock from './WtuAppListBlock'
import WtuAppListBlockItem from './WtuAppListBlockItem'
export default {
  name: 'WtuAppList',
  components: { WtuAppListBlockItem, WtuAppListBlock },
  setup () {
  }
}
</script>

<style lang="scss">
.wtu-app{
  padding: 15rpx;
  box-sizing: border-box;
}
</style>
