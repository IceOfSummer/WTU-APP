<template>
  <view class="news-block">
    <view class="news-block-title">
      <text>{{title}}</text>
    </view>
    <view class="new-block-content">
      <slot/>
    </view>
  </view>
</template>

<script>
export default {
  name: 'NewsBlock',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
.new-block-content{
  display: flex;
  flex-direction: column;
  margin-top: 10rpx;
  font-size: $uni-font-size-sm;
  color: #fff;
}
.news-block-title{
  font-size: $uni-font-size-base;
  color: white;
}
.news-block{
  background-color: #3d36d750;
  border-radius: 28rpx;
  box-sizing: border-box;
  padding: 20rpx;
  margin: 20rpx;
}
</style>
