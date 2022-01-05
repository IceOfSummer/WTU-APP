<template>
  <picker :range="range" :value="modelValue" @change="changeEvent" class="options-picker">
    <text>{{title}}</text>
    <text><slot/></text>
  </picker>
</template>

<script>
export default {
  name: 'OptionsPicker',
  props: {
    range: Array,
    modelValue: Number,
    title: String
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {

    const changeEvent = (event) => {
      emit('update:modelValue', event.detail.value)
      emit('change', event)
    }

    return {
      changeEvent
    }
  }
}
</script>

<style lang="scss">
@import "../OptionStyle";
.options-picker{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $form-height;
  box-sizing: border-box;
  padding: 0 20rpx;
  margin: $form-margin;
  font-size: $form-label-font-size;
  > text:last-child{
    color: $uni-color-primary;
  }
}
</style>
