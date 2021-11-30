<template>
  <view class="class-item" :style="'top:' + beginAt * 110 + 'rpx; left:' + week * 100 + 'rpx;height:' + (110 * duration - 10) + 'rpx'">
    <text>{{detail.kcmc}}</text>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ClassItem',
  props: {
    /**
     * 响应的json对象
     */
    detail: Object
  },
  setup (props) {

    const strDuration = props.detail.jcs.toString().split('-')

    const start = Number.parseInt(strDuration[0]) - 1
    const end = Number.parseInt(strDuration[1]) - 1


    const beginAt = ref(start)
    const week = ref(Number.parseInt(props.detail.xqj) - 1)
    const duration = ref(end - start + 1)

    return {
      beginAt,
      week,
      duration
    }
  }
}
</script>

<style lang="scss">
.class-item{
  position: absolute;
  background-color: skyblue;
  width: 90rpx;
  border-radius: 10px;
  text-align: center;
  > text {
    font-size: 16px;
  }
}
</style>
