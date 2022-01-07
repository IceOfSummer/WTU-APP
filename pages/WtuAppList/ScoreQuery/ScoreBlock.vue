<template>
  <view class="score-block" v-if="scores.length !== 0">
    <view class="score-block-title">
      <text>{{title}}</text>
    </view>
    <view class="score-block-item">
      <view class="score-block-item-table score-block-item-table-header">
        <view>
          <text>课程名称</text>
        </view>
        <view>
          <text>教师名称</text>
        </view>
        <view>
          <text>最终成绩</text>
        </view>
      </view>
      <view v-for="(item, index) in scores" :key="index" class="score-block-item-table" :style="`color: ${getSubjectColor(item.cj)}`" @click="seeDetail(item)">
        <view>
          <text>{{item.kcmc}}</text>
        </view>
        <view>
          <text>{{item.jsxm}}</text>
        </view>
        <view>
          <text>{{item.cj}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ScoreBlock',
  props: {
    title: String,
    scores: {
      type: Array,
      default: () => []
    }
  },
  setup () {

    /**
     * 获取成绩的对应颜色
     * @param score 成绩
     * @return {string} 颜色
     */
    const getSubjectColor = (score) => {
      if (score >= 75) {
        return '#4cd964'
      } else if (score >= 60 && score < 75) {
        return '#f0ad4e'
      } else if (score < 60) {
        return '#dd524d'
      } else if (score === '及格' || score === '合格' || score === '优秀') {
        return '#4cd964'
      } else {
        return '#dd524d'
      }
    }

    /**
     * 查看课程详细信息
     * @param detail {Object} 课程信息
     */
    const seeDetail = (detail) => {
      uni.navigateTo({
        url: `/pages/WtuAppList/ScoreQuery/ScoreDetail/ScoreDetail?detail=${JSON.stringify(detail)}`
      })
    }

    return {
      getSubjectColor,
      seeDetail
    }
  }
}
</script>

<style lang="scss">
.score-block{
  margin: 40rpx 0;
}
.score-block-item-table-header{
  > view {
    font-size: $uni-font-size-lg !important;
  }
}
.score-block-item-table{
  width: 640rpx;
  margin: 0 auto;
  padding: 12rpx 0;
  display: flex;
  justify-content: center;
  border-bottom: 1rpx solid $uni-border-color;
  > view {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 200rpx;
    margin: 10rpx 0;
    font-size: $uni-font-size-sm;
  }
  &:nth-child(odd) {
    background-color: rgb(250, 250, 250);
  }
}
.score-block-item-detail{
  display: flex;
}
.score-block-item{
}
.score-block-title{
  font-size: $uni-font-size-title;
  margin-bottom: 15rpx;
  margin-left: 15rpx;
  color: $uni-color-primary;
}
</style>
