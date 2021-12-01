<template>
  <view class="class-info">
    <view class="class-info-title">
      <text>{{detail.kcmc}}</text>
    </view>
    <view class="class-info-detail">
      <view>
        <text>教室</text>
        <text>{{detail.cdmc}}</text>
      </view>
      <view>
        <text>周数</text>
        <text>{{detail.zcd}}</text>
      </view>
      <view>
        <text>课程类型</text>
        <text>{{detail.kclb}}</text>
      </view>
      <view>
        <text>老师</text>
        <text>{{detail.xm}}</text>
      </view>
      <view>
        <text>课程安排</text>
        <text>{{detail.kcxszc}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ClassesInfo',
  data () {
    return {
      detail: []
    }
  },
  onLoad ({ start, week }) {

    // const strDuration = classes.jcs.toString().split('-')
    //
    // const start = Number.parseInt(strDuration[0]) - 1
    // const week = Number.parseInt(props.detail.xqj) - 1
    // console.log(start + week)

  },
  setup () {}
}
</script>

<style lang="scss">
.class-info-detail{
  > view {
    margin: 10px 0;
    font-size: 15px;
    text:first-child {
      color: $uni-text-color-grey;
    }
    text:last-child {
      color: $uni-text-color;
      margin-left: 10px;
    }
  }
}
.class-info{
  box-sizing: border-box;
  padding: 30rpx;
  background-color: #fff;

}
.class-info-title{
  color: $uni-color-primary;
  font-size: 30px;
}
</style>
