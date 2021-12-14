<template>
  <view class="loading-mask" v-if="isLoading">
    <view class="spinner">
      <view class="double-bounce1"></view>
      <view class="double-bounce2"></view>
    </view>
    <view class="loading-mask-title">{{title}}</view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LoadingMask',
  props: {
    title: {
      default: '加载中',
      type: String
    }
  },
  setup () {
    const isLoading = ref(false)

    const showLoading = () => {
      console.log('start')
      isLoading.value = true
    }

    const stopLoading = () => {
      isLoading.value = false
    }

    return {
      isLoading,
      showLoading,
      stopLoading
    }
  }
}
</script>

<style lang="scss">
.loading-mask-title{
  text-align: center;
  color: #fff;
  font-size: 28rpx;
}
.loading-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: $uni-bg-color-mask;
}
.spinner {
  width: 100rpx;
  height: 100rpx;

  position: relative;
  margin: 400rpx auto 0;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: $uni-color-primary;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
}
</style>
