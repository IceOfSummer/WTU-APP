<template>
  <view class="index-tryLogin-input-outer">
    <text class="iconfont index-tryLogin-input-img" v-if="type === 0">&#xe627;</text>
    <text class="iconfont index-tryLogin-input-img" v-if="type === 1">&#xe60e;</text>
    <text class="iconfont index-tryLogin-input-img" v-if="type === 2">&#xe624;</text>
    <input class="index-tryLogin-input" maxlength="35" :placeholder="placeholder" placeholder-style="color:#fff" :password="type === 1"
           @input="updateText"/>
  </view>
</template>

<script lang="ts">

export default {
  name: 'InputBlock',
  props: {
    placeholder: String,
    /**
     * 0: 用户名
     * 1: 密码
     * 2: 验证码
     */
    type: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    // 更新文字
    const updateText = ({ detail }) => {
      emit('update:value', detail.value)
    }

    return {
      updateText
    }
  }
}
</script>

<style lang="scss">
.index-tryLogin-input-outer {
  display: flex;
  width: 661rpx;
  height: 101rpx;
  margin: 20rpx 0;
  background-color: rgba(248, 248, 248, 0.15);
  border-radius: 50rpx;
  flex-direction: row;
  align-items: center;
}

.index-tryLogin-input {
  color: #ffffff;
  font-size: 30rpx;
  opacity: 0.8;
  width: 544rpx;
  height: 101rpx;
}

.index-tryLogin-input-img {
  margin-left: 30rpx;
  margin-right: 20rpx;
  font-size: 58rpx;
  opacity: 0.7;
  color: #fff;
}
</style>
