<template>
  <view class="options-block">
    <text>{{title}}</text>
    <switch :checked="modelValue" @change="change"></switch>
  </view>
</template>

<script>

export default {
  name: 'OptionsSwitch',
  props: {
    modelValue: Boolean,
    title: String
  },
  setup (props, { emit }) {
    const change = (event) => {
      emit('update:modelValue', event.detail.value)
    }

    return {
      change
    }
  }
}
</script>

<style lang="scss">
</style>
