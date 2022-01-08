<template>
  <view class="link-bock">
    <slot/>
  </view>
</template>

<script>
export default {
  name: 'LinkBlock'
}
</script>

<style lang="scss">
.link-bock{
  background-color: #3d36d750;
  border-radius: 28rpx;
  box-sizing: border-box;
  padding: 20rpx;
  margin: 20rpx;
  color: $uni-color-success;
  font-size: $uni-font-size-sm;
}
</style>
