<template>
  <view class="status-bar"></view>
</template>

<script>
export default {
  name: 'StatusBar'
}
</script>

<style lang="scss">
.status-bar{
  position: sticky;
  top: 0;
  height: var(--status-bar-height);
  width: 750rpx;
  z-index: 10;
  background-color: rgb(236, 236, 236);
}
</style>
