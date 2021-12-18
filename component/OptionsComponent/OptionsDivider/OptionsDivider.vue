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
.options-divider{
  height: 1px;
  margin: 2rpx auto;
  border-top: 1rpx solid $uni-border-color;
}
</style>
