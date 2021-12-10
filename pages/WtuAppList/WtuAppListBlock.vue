<template>
  <view class="wtu-app-block">
    <view>
      <text>{{title}}</text>
    </view>
    <view class="wtu-app-block-items">
      <slot name="default"/>
    </view>
  </view>
</template>

<script>
export default {
  name: 'WtuAppListBlock',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
.wtu-app-block-items{
  display: flex;
  flex-wrap: wrap;
}
.wtu-app-block{
  padding: 15rpx;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: white;
  > view:first-child{
    border-bottom: 1px solid $uni-border-color;
    font-size: 24rpx;
    color: $uni-text-color-grey;
  }
}
</style>
