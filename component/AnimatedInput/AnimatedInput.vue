<template>
  <view class="ani-input">
    <input :type="type" @focus="isEnter = true" @blur="isEnter = modelValue.length !== 0" @input="updateText" :value="modelValue"/>
    <view class="ani-input-placeholder" :class="{'ani-input-focus': isEnter, 'ani-input-error': errorMsg.length !== 0}">
      <text>{{placeholder}}</text>
      <text v-if="errorMsg.length !== 0">({{errorMsg}})</text>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AnimatedInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    modelValue: String,
    errorMsg: String
  },
  emits: ['update:errorMsg', 'onUpdate:modelValue'],
  setup (props, { emit }) {
    const isEnter = ref(props.modelValue.length !== 0)

    // 更新文字
    const updateText = ({ detail }) => {
      emit('update:errorMsg', '')
      emit('update:modelValue', detail.value)
    }

    // /**
    //  * 根据当前输入框更新显示状态
    //  */
    // const upDateEnterStatus = () => {
    //   isEnter.value = props.modelValue.length !== 0
    // }
    // upDateEnterStatus()


    return {
      isEnter,
      updateText
    }
  }
}
</script>

<style lang="scss">
.ani-input-error{
  color: $uni-color-error !important;
}
.ani-input-focus{
  top: -26rpx !important;
  font-size: 18rpx;
}
.ani-input-placeholder{
  position: absolute;
  top: 0;
  transition-property: top, font-size;
  transition-duration: .5s;
  z-index: 1;
}
.ani-input{
  position: relative;
  > input {
    position: relative;
    z-index: 2;
  }
}
</style>
