<template>
  <view class="ani-collapse">
    <view class="ani-collapse-header" @click="toggleCollapse">
      <text>{{title}}</text>
      <view class="ani-collapse-arrow" :class="{'ani-collapse-arrow-hide': !show}">
        <text class="iconfont">&#xe6b9;</text>
      </view>
    </view>
    <view class="ani-collapse-view" :style="`height: ${show ? collapseContentHeight : 0}`">
      <view :id="title">
        <slot :data="refData"/>
      </view>
    </view>
  </view>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue'
import LoadingMask from '../LoadingMask/LoadingMask'

export default {
  name: 'AnimatedCollapse',
  components: { LoadingMask },
  props: {
    title: String,
    open: {
      type: Boolean,
      default: false
    },
    /**
     * 当折叠面板第一次打开时会调用该方法返回一个promise, 并且将返回值绑定到prop插槽上
     */
    firstOpenPromise: Function,
    classBackArgs: Object
  },
  setup (props) {


    const collapseContentHeight = ref('0')

    function flushHeight() {
      uni.createSelectorQuery().select(`#${props.title}`).boundingClientRect(({ height }) => {
        collapseContentHeight.value = height + 'px'
      }).exec()
    }

    onMounted(() => {
      flushHeight()
    })


    const show = ref(props.open)
    // 判断firstOpenCallback是否已经执行过了
    let isInvoked = props.open

    const refData = ref({})

    if (isInvoked) {
      getRefData()
    }

    function getRefData() {
      if (props.firstOpenPromise) {
        props.firstOpenPromise(props.classBackArgs).then(data => {
          refData.value = data
          nextTick(() => {
            flushHeight()
          })
        }).catch(e => console.log(e))
      }
    }



    const toggleCollapse = () => {
      show.value = !show.value
      if (!isInvoked && show.value) {
        // refData.value = props.firstOpenCallback ? props.firstOpenCallback(props.classBackArgs) : {}
        getRefData()
        isInvoked = true
      }
    }

    return {
      show,
      toggleCollapse,
      collapseContentHeight,
      refData
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
