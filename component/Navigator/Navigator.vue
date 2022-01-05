<template>
  <view class="navigator">
    <view class="status-bar"></view>
    <view class="navigator-content">
      <view class="navigator-content-left">
        <view class="back-arrow" v-if="showBack" @click="clickBack"></view>
      </view>
      <view class="navigator-content-title">
        <text>{{title}}</text>
      </view>
      <view class="navigator-content-right">
        <slot name="right"/>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MyNavigator',
  props: {
    title: String,
    showBack: Boolean
  },
  setup () {
    const clickBack = () =>{
      uni.navigateBack()
    }

    return {
      clickBack
    }
  }
}
</script>

<style lang="scss">
.navigator-content-left{
  box-sizing: border-box;
  padding-left: 20rpx;
}
.navigator-content-right{
  justify-content: flex-end;
  box-sizing: border-box;
  padding-right: 20rpx;
  font-size: $uni-img-size-sm;
}
.navigator{
  background-color: rgb(236, 236, 236);
  width: 100%;
}
.navigator-content-title{
  justify-content: center;
  font-size: $uni-font-size-subtitle;
}
.back-arrow{
  @include left-arrow(black, 20rpx);
}
.status-bar{
  height: var(--status-bar-height);
  width: 100%;
}
.navigator-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90rpx;
  > view {
    height: 90rpx;
    width: 250rpx;
    display: flex;
    align-items: center;
  }
}
</style>
