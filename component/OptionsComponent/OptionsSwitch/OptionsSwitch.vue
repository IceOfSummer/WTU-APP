<template>
  <view class="options-switch">
    <view>
      <text>{{title}}</text>
    </view>
    <switch :checked="modelValue" @change="change"></switch>
  </view>
</template>

<script>

export default {
  name: 'OptionsSwitch',
  props: {
    modelValue: Boolean,
    title: String,
    updateCallback: Function
  },
  setup (props, { emit }) {
    const change = (event) => {
      emit('update:modelValue', event.detail.value)
      props.updateCallback ? props.updateCallback(event.detail.value) : ''
    }

    return {
      change
    }
  }
}
</script>

<style lang="scss">
@import "../OptionStyle";
.options-switch{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $form-height;
  box-sizing: border-box;
  padding: 0 20rpx;
  margin: $form-margin;
  text {
    font-size: $form-label-font-size;
  }
}
</style>
