<template>
  <view class="class-info-item">
    <view class="class-info-item-title">
      <text style="color: #007aff" v-if="type === 0">{{detail.kcmc}}</text>
      <text style="color: #4cd964" v-if="type === 1">{{detail.kcmc}} (已结课)</text>
      <text style="color: #f0ad4e" v-if="type === 2">{{detail.kcmc}} (未开始)</text>
    </view>
    <view class="class-info-item-detail">
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
export default {
  name: 'ClassesInfoItem',
  props: {
    detail: Object,
    type: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.class-info-item-detail{
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
.class-info-item{
  box-sizing: border-box;
  padding: 30rpx;
  border-bottom: 1px solid $uni-border-color;
  background-color: #fff;
}
.class-info-title{
  font-size: 30px;
}
</style>
