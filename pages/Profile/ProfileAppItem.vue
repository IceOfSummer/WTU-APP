<template>
  <view class="profile-app-item">
    <view class="profile-app-item-block">
      <text class="iconfont"><slot></slot></text>
      <text>{{title}}</text>
    </view>
    <view class="profile-app-item-more"></view>
  </view>
</template>

<script>
export default {
  name: 'ProfileAppItem',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
.profile-app-item-block{
  display: flex;
  align-items: center;
  > .iconfont {
    margin-right: 10rpx;
    font-size: 45rpx;
    color: skyblue;
  }
}
.profile-app-item-more{
  @include right-arrow($uni-border-color, 12rpx)
}
.profile-app-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120rpx;
  box-sizing: border-box;
  padding: 0 30rpx;
  border-bottom: 1px solid $uni-border-color;
}
</style>
