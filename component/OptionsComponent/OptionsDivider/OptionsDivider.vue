<template>
  <view class="options-divider" :style="'width:' + width"></view>
</template>

<script>
export default {
  name: 'OptionsDivider',
  props: {
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="scss">
@import "../OptionStyle";
.options-divider{
  height: 1rpx;
  margin: 0 auto;
  //background-color: $uni-text-color-grey;
  border-top: 1rpx solid $uni-border-color;
}
</style>
