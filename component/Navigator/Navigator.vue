<template>
  <view class="navigator">
    <view class="navigator-content">
      <view class="navigator-content-left">
        <view class="back-arrow" v-if="showBack" @click="clickBack"></view>
      </view>
      <view class="navigator-content-title">
        <text :style="`font-size: ${title.length < 10 ? '36rpx': '28rpx'}`">{{title}}</text>
      </view>
      <view class="navigator-content-right">
        <slot name="right"/>
      </view>
    </view>
    <view v-if="showPercent" class="loading-bar" :style="`width: ${currentPercent / 100  * 750 }rpx; opacity: ${processBarOpacity}`"></view>
  </view>
</template>

<script>
import { onUnmounted, ref } from 'vue'

export default {
  name: 'MyNavigator',
  props: {
    title: String,
    showBack: Boolean,
    showPercent: Boolean
  },
  setup (props) {
    const currentPercent = ref(0)
    const processBarOpacity = ref(1)

    const clickBack = () =>{
      uni.navigateBack()
    }

    let slowAdd
    let addPercent

    /**
     * 设置进度条进度
     * @param val {number} 进度
     */
    function setPercent(val) {
      if (val > currentPercent.value) {
        currentPercent.value = val
      }
    }

    /**
     * 展示加载条
     */
    function startLoad() {
      addPercent = setInterval(() => {
        // 每秒加一点点进度
        if (currentPercent.value <= 75) {
          // 等于75时表示组件已经加载完毕, 还在等待ajax加载
          currentPercent.value++
        } else {
          clearInterval(addPercent)

          slowAdd = setInterval(() => {
            // 等待ajax响应
            if (currentPercent.value <= 90) {
              currentPercent.value++
            }
          }, 1000)
        }
      }, 100)
    }
    if (props.showPercent) {
      startLoad()
    }

    onUnmounted(() => {
      clearAllInterval()
    })

    const loadSuccess = () => {
      setTimeout(() => {
        // 防止加载太快
        setPercent(100)
        setTimeout(() => {
          // 清除加载条
          // currentPercent.value = 0
          processBarOpacity.value = 0
          clearAllInterval()
        }, 1000)
      }, 200)
    }

    const viewInitSuccess = () => {
      setTimeout(() => {
        setPercent(50)
        setTimeout(() => {
          setPercent(75)
        }, 600)
      }, 500)
    }

    function clearAllInterval () {
      if (addPercent) {
        clearInterval(addPercent)
      }
      if (slowAdd) {
        clearInterval(slowAdd)
      }
    }


    return {
      clickBack,
      currentPercent,
      loadSuccess,
      processBarOpacity,
      viewInitSuccess
    }
  }
}
</script>

<style lang="scss">
.loading-bar{
  transition: all .5s;
  height: 3rpx;
  width: 0;
  background-color: skyblue;
}
.navigator-content-left{
  width: 50rpx;
  box-sizing: border-box;
  padding-left: 20rpx;
}
.navigator-content-right{
  width: 50rpx;
  justify-content: flex-end;
  box-sizing: border-box;
  padding-right: 20rpx;
  font-size: $uni-img-size-sm;
}
.navigator{
  position: relative;
  background-color: rgb(236, 236, 236);
  width: 100%;
  z-index: 9;
}
.navigator-content-title{
  width: 650rpx;
  justify-content: center;
  font-size: $uni-font-size-subtitle;
  flex-wrap: nowrap;
}
.back-arrow{
  @include left-arrow(black, 20rpx);
}
.navigator-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90rpx;
  > view {
    height: 90rpx;
    display: flex;
    align-items: center;
  }
}
</style>
