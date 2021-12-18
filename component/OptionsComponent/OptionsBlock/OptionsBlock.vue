<template>
  <view class="options-block">
    <view>
      <text v-if="type === 'danger'" style="color: #dd524d">{{title}}</text>
      <text v-else style="color: #999">{{title}}</text>
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
    },
    /**
     * 选项框类型:
     * info | danger
     */
    type: String
  }
}
</script>

<style lang="scss">
.options-block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  //border-bottom: 1rpx solid $uni-border-color;
  text {
    font-size: 24rpx;
  }
}
</style>
