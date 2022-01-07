<template>
  <view class="reload-mask" v-if="showReload">
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

    const reload = () => {
      uni.redirectTo({ url: props.reloadUrl })
    }
    return {
      reload
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
}
.reload-text-btn{
  color: $uni-color-primary;
  font-size: $uni-font-size-sm;
}
</style>
