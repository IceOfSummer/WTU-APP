<template>
  <view class="wtu-app-block-item">
    <view>
      <image :src="image" class="wtu-app-block-item-img"/>
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
    title: String,
    image: String
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
    margin-bottom: 5rpx;
  }
  > view:last-child{
    font-size: 16px;
  }
}
</style>
