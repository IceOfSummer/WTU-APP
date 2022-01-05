<template>
  <view class="options-block">
    <view>
      <text v-if="type === 'danger'" style="color: #dd524d">{{title}}</text>
      <text v-else-if="type === 'primary'" style="color: #007aff">{{title}}</text>
      <text v-else>{{title}}</text>
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
     * info | danger | primary
     */
    type: String
  }
}
</script>

<style lang="scss">
@import "../OptionStyle";
.options-block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $form-height;
  box-sizing: border-box;
  margin: $form-margin;
  padding: 0 20rpx;
  text {
    font-size: $form-label-font-size;
  }
}
</style>
