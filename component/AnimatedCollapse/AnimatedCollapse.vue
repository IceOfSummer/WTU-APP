<template>
  <view class="ani-collapse">
    <view class="ani-collapse-header" @click="show = !show">
      <text>{{title}}</text>
      <view class="ani-collapse-arrow" :class="{'ani-collapse-arrow-hide': !show}">
        <text class="iconfont">&#xe6b9;</text>
      </view>
    </view>
    <view class="ani-collapse-view" :style="`height: ${show ? collapseContentHeight : 0}`">
      <view id="collapse">
        <slot/>
      </view>
    </view>
  </view>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'AnimatedCollapse',
  props: {
    title: String,
    open: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const show = ref(props.open)

    const collapseContentHeight = ref('0')

    onMounted(() => {
      uni.createSelectorQuery().select('#collapse').boundingClientRect(({ height }) => {
        collapseContentHeight.value = height + 'px'
      }).exec()
    })

    return {
      show,
      collapseContentHeight
    }
  }
}
</script>

<style lang="scss">
#collapse{
  padding: 30rpx 0;
}
.collapse-show{
  height: 50rpx !important;
}
.collapse-hide{
  height: 0;
}
.ani-collapse-view{
  transition: height .5s;
  overflow: hidden;
}
.ani-collapse-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70rpx;
  color: $uni-text-color-grey;
}
.ani-collapse-arrow{
  font-size: 30rpx;
  margin-right: 10rpx;
  transition: all .5s;
}
.ani-collapse-arrow-hide{
  transform: rotate(-180deg) !important;
}
.ani-collapse{
  padding: 0 20rpx;
  font-size: 24rpx;
  box-sizing: border-box;
}
</style>
