<template>
  <view @click="changeEvent" class="line-checkbox" :style="`background-color: ${copyOfModelValue ? '#87CEEB' : '#fff'}`">
    <view class="line-checkbox-title" :style="`color: ${copyOfModelValue ? '#fff': '#007aff' }`">
      <text>{{title}}</text>
    </view>
    <view class="line-checkbox-area" >
      <text class="iconfont">&#xe65d;</text>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LineCheckbox',
  props: {
    value: [String, Number],
    modelValue: Boolean,
    title: String
  },
  emits: ['change', 'update:modelValue'],
  setup (props, { emit }) {

    const copyOfModelValue = ref(!!props.modelValue)

    const changeEvent = () => {
      copyOfModelValue.value = !copyOfModelValue.value

      emit('change', { isSelect: copyOfModelValue.value, value: props.value })
      if (props.modelValue) {
        emit('update:modelValue', copyOfModelValue.value)
      }
    }

    return {
      changeEvent,
      copyOfModelValue
    }
  }
}
</script>

<style lang="scss">
.line-checkbox{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80rpx;
  height: 110rpx;
  transition: background-color .3s;
  &:first-child{
    border-left: 1rpx solid rgba(214, 214, 217, 0.8);
  }
  &:last-child{
    border-right: 1rpx solid rgba(214, 214, 217, 0.8);
  }
  > view {
    border: 1rpx solid rgba(214, 214, 217, 0.8);
    text-align: center;
    width: 100%;
  }
}
.line-checkbox-title{
  height: 40rpx;
  line-height: 40rpx;
  transition: color .3s;
}
.line-checkbox-area {
  height: 70rpx;
  font-size: 45rpx;
  text-align: center;
  color: #fff;
}
</style>
