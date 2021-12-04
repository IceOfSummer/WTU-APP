<template>
  <view class="wtu-app">
    <wtu-app-list-block title="推荐">
      <wtu-app-list-block-item title="查询空闲教室" image="static/image/classroom.png"></wtu-app-list-block-item>
      <wtu-app-list-block-item title="成绩查询" image="static/image/score.png"></wtu-app-list-block-item>
      <wtu-app-list-block-item title="选课工具" image="static/image/subject.png"></wtu-app-list-block-item>
      <wtu-app-list-block-item title="登录教务系统" image="static/image/earth.png"></wtu-app-list-block-item>
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
