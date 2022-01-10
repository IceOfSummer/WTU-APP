<template>
  <view class="reload-mask" v-if="showReload || apiReload">
    <view>
      <view class="text-info text-to-center">
        <text>Oops! 好像加载失败了</text>
      </view>
      <view v-if="showCause" class="text-error text-to-center">
        <text>{{reason}}</text>
      </view>
      <view class="reload-text-btn-area">
        <view class="reload-text-btn" v-if="!showCause">
          <text @click="showCause = true">显示原因</text>
        </view>
        <view class="reload-text-btn">
          <text @click="reload">重新加载</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import { ref } from 'vue'

export default {
  name: 'ReloadMask',
  props: {
    reloadUrl: {
      type: String,
      required: true
    },
    showReload: Boolean
  },
  setup (props) {
    const apiReload = ref(false)
    const reason = ref('')
    const showCause = ref(false)

    const reload = () => {
      console.log('reload')
      uni.redirectTo({ url: props.reloadUrl })
    }

    /**
     *
     * @param e {Error} 错误类型
     */
    const needReload = (e) => {
      apiReload.value = true
      reason.value = e.toString()
    }
    return {
      reload,
      apiReload,
      needReload,
      reason,
      showCause
    }
  }
}
</script>

<style lang="scss">
.reload-text-btn-area{
  display: flex;
  justify-content: center;
}
.reload-mask{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: white;
}
.reload-text-btn{
  color: $uni-color-primary;
  font-size: $uni-font-size-sm;
  margin: 10rpx 20rpx;
}
</style>
