<template>
  <view class="options-block">
    <view>
      <text>{{title}}</text>
      <slot name="left"/>
    </view>
    <view>
      <slot name="right"/>
    </view>
  </view>
</template>

<script>
export default {
  name: 'OptionsBlock',
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss">
.options-block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  border-top: 1px solid $uni-border-color;
  border-bottom: 1px solid $uni-border-color;
  text {
    color: $uni-text-color-grey;
    font-size: 20px;
  }
}
</style>
