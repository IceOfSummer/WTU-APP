<template>
  <view class="wtu-app-block-item">
    <view>
      <text class="iconfont">
        <slot></slot>
      </text>
    </view>
    <view>
      <text>{{title}}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'WtuAppListBlockItem',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
.wtu-app-block-item-img{
  width: 48rpx;
  height: 48rpx;
}
.wtu-app-block-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 172rpx;
  margin: 30rpx 0;
  > view:first-child{
    font-size: 50rpx;
    color: skyblue;
    margin-bottom: 5rpx;
  }
  > view:last-child{
    font-size: 20rpx;
  }
}
</style>
