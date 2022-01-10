<template>
  <view>
    <reload-mask ref="reload" :reload-url="reloadUrl"/>
    <status-bar/>
    <my-navigator show-percent show-back ref="nav" title="空闲教室查询"/>
    <view class="query-result">
      <view class="query-result-list">
        <view class="query-result-row query-result-header">
          <view>教室名称</view>
          <view>适用范围</view>
          <view>教室位置</view>
        </view>
        <view class="query-result-row" v-for="(item, index) in classroomDetail" :key="index">
          <view>{{item.cdlbmc}}</view>
          <view>{{item.cdjylx}}</view>
          <view>{{item.cdmc}}</view>
        </view>
        <view class="query-result-empty-tip" v-if="classroomDetail.length === 0">
          <text>没有查询到结果, 请修改相关查询条件</text>
        </view>
      </view>
      <view class="query-result-page-control">
        <button class="query-result-btn" :disabled="curPageIndex === 1" @click="changeCurPageIndex(curPageIndex - 1)">上一页</button>
        <text class="query-result-page-tip">{{curPageIndex}}/{{maxPage}}页</text>
        <button class="query-result-btn" @click="changeCurPageIndex(curPageIndex + 1)" :disabled="curPageIndex === maxPage || maxPage === 0">下一页</button>
      </view>
      <loading-mask ref="mask"/>
    </view>
  </view>
</template>

<script>
import { PROXY_SCHOOL_APP_AJAX } from '../../../../store/actions-type'
import { getEmptyClassroom } from '../../../../api/schoolApp/emptyClassQuery'
import LoadingMask from '../../../../component/LoadingMask/LoadingMask'
import MyNavigator from '../../../../component/Navigator/Navigator'
import StatusBar from '../../../../component/Navigator/StatusBar'
import { useStore } from 'vuex'
import ReloadMask from '../../../../component/ReloadMask/ReloadMask'

export default {
  name: 'QueryResultPage',
  components: { ReloadMask, StatusBar, MyNavigator, LoadingMask },
  data () {
    return {
      queryParam: {
        year: 2021,
        classPos: 0,
        week: 1,
        day: 1,
        duration: 1,
        term: ''
      },
      classroomDetail: [],
      curPageIndex: 1,
      maxPage: 1,
      reloadUrl: ''
    }
  },
  onLoad ({ queryParam }) {
    this.reloadUrl = `/pages/WtuAppList/EmptyClassroomQuery/QueryResultPage/QueryResultPage?queryParam=${queryParam}`
    this.queryParam = JSON.parse(queryParam)
    this.loadEmptyClassRoom(this.curPageIndex)
  },
  methods: {
    loadEmptyClassRoom (pageIndex = 1) {
      const that = this
      const { queryParam } = this
      const store = useStore()
      if (this.$refs.mask) {
        this.$refs.mask.showLoading()
      }
      this.$store.dispatch(PROXY_SCHOOL_APP_AJAX, getEmptyClassroom(queryParam.year, queryParam.classPos,
        queryParam.week, queryParam.day, queryParam.duration, store.state.classes.classesOptions.term, pageIndex)).then(resp => {
        that.classroomDetail = resp.items
        that.maxPage = resp.totalPage
      }).catch(e => {
        that.$refs.needReload(e)
      }).finally(() => {
        that.$refs.nav.loadSuccess()
        if (that.$refs.mask) {
          that.$refs.mask.stopLoading()
        }
      })
    },
    changeCurPageIndex (val) {
      this.curPageIndex = val
      this.loadEmptyClassRoom(val)
    }
  },
  mounted() {
    this.$refs.nav.viewInitSuccess()
  }
}
</script>

<style lang="scss">
.query-result-empty-tip{
  margin: 40rpx 0;
  font-size: 20rpx;
  color: $uni-text-color-grey;
  text-align: center;
}
.query-result-page-tip{
  font-size: 18rpx;
  color: $uni-text-color-grey;
}
.query-result-btn{
  width: 120rpx;
  height: 50rpx;
  font-size: 20rpx;
  background-color: skyblue;
  color: #fff;
}
.query-result-list{
  display: flex;
  flex-direction: column;
}
.query-result-page-control{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx 0;
}
.query-result{
  box-sizing: border-box;
  padding: 30rpx;
  background-color: #fff;
}
.query-result-row{
  display: flex;
  justify-content: center;
  color: $uni-text-color-grey;
  height: 50rpx;
  > view {
    width: 220rpx;
    border: 1rpx solid $uni-border-color;
    text-align: center;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.query-result-header{
  > view {
    font-size: 32rpx !important;
    color: $uni-color-primary;
  }
}
</style>
