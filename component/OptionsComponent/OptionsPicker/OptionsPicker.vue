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
  emits: ['update:modelValue'],
  setup (props, { emit }) {

    const changeEvent = ({ detail }) => {
      emit('update:modelValue', detail.value)
    }

    return {
      changeEvent
    }
  }
}
</script>

<style lang="scss">
.options-picker{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  color: $uni-text-color-grey;
  font-size: 24rpx;
  > text:last-child{
    color: $uni-color-primary;
  }
}
</style>
