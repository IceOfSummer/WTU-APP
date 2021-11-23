<template>
  <view class="content">
    <text>如你所见,我打算制作一个纺大的专属app</text>
    <text>当然,这纯粹出于个人兴趣</text>
    <text>目前还只是一个测试版</text>
    <text>希望自己能坚持下去吧!</text>
  </view>
</template>

<script>

export default {
  name: 'HomeIndex',
  setup() {
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200 rpx;
  width: 200 rpx;
  margin: 200 rpx auto 50 rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36 rpx;
  color: #8f8f94;
}
</style>
