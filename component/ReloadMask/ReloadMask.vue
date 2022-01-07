<template>
  <view class="reload-mask" v-if="showReload || apiReload">
    <view>
      <view class="text-info text-to-center">
        <text>Oops! 好像加载失败了</text>
      </view>
      <view class="text-to-center reload-text-btn">
        <text @click="reload">重新加载</text>
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

    const reload = () => {
      console.log('reload')
      uni.redirectTo({ url: props.reloadUrl })
    }

    const needReload = () => {
      apiReload.value = true
    }
    return {
      reload,
      apiReload,
      needReload
    }
  }
}
</script>

<style lang="scss">
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
}
</style>
