<template>
  <view>
    <reload-mask :reload-url="reloadUrl" ref="reload"/>
    <status-bar/>
    <my-navigator :title="detail.kcmc" show-back ref="navigator" show-percent/>
    <view>
      <view>
        <view class="score-detail-table-row score-detail-table-header">
          <view>
            <text>成绩分项</text>
          </view>
          <view>
            <text>占比</text>
          </view>
          <view>
            <text>成绩</text>
          </view>
        </view>
        <view class="score-detail-table-row score-detail-table-normal" v-for="(item, index) in scoreList" :key="index">
          <view>
            <text>{{item.type}}</text>
          </view>
          <view>
            <text>{{item.rate}}</text>
          </view>
          <view>
            <text>{{item.score}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="score-detail-info">
      <view class="score-detail-info-title">
        <text>其它信息</text>
      </view>
      <options-divider width="560rpx"/>
      <view class="score-detail-info-more">
        <view>
            <text>学分: </text>
            <text>{{detail.xf}}</text>
        </view>
        <view>
          <text>课程性质: </text>
          <text>{{detail.kcxzmc}}</text>
        </view>
        <view>
          <text>绩点: </text>
          <text>{{detail.jd}}</text>
        </view>
        <view>
          <text>成绩是否作废: </text>
          <text>{{detail.cjsfzf}}</text>
        </view>
        <view>
          <text>开课学院: </text>
          <text>{{detail.jgmc}}</text>
        </view>
        <view>
          <text>成绩性质: </text>
          <text>{{detail.ksxz}}</text>
        </view>
        <view>
          <text>是否学位课程: </text>
          <text>{{detail.sfxwkc}}</text>
        </view>
        <view>
          <text>教学班: </text>
          <text>{{detail.jxbmc}}</text>
        </view>
        <view>
          <text>任课教师: </text>
          <text>{{detail.jsxm}}</text>
        </view>
        <view>
          <text>考核方式: </text>
          <text>{{detail.khfsmc}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyNavigator from '../../../../component/Navigator/Navigator'
import { getScoreDetail } from '../../../../api/schoolApp/scoreQuery'
import { useStore } from 'vuex'
import ReloadMask from '../../../../component/ReloadMask/ReloadMask'
import { PROXY_SCHOOL_APP_AJAX } from '../../../../store/actions-type'
import OptionsDivider from '../../../../component/OptionsComponent/OptionsDivider/OptionsDivider'
import StatusBar from '../../../../component/Navigator/StatusBar'
export default {
  name: 'ScoreDetail',
  components: { StatusBar, OptionsDivider, ReloadMask, MyNavigator },
  data () {
    return {
      detail: {},
      reloadUrl: '',
      scoreList: []
    }
  },
  onLoad ({ detail }) {
    this.detail = JSON.parse(detail)
    this.reloadUrl = `/pages/WtuAppList/ScoreQuery/ScoreDetail/ScoreDetail?detail=${detail}`
  },
  mounted() {
    const store = useStore()
    const { detail } = this
    const that = this
    const nav = this.$refs.navigator
    nav.viewInitSuccess()
    store.dispatch(PROXY_SCHOOL_APP_AJAX, getScoreDetail(store.state.eduSystemUser.username, detail.jxb_id, detail.xnm, detail.xqm, detail.kcmc)).then(resp => {
      // 分离成绩表格
      const scoreList = resp.match(/<tbody>[\s\S]*<\/tbody>/)
      // 每三个一组, 第一个是分数的类型, 第二个是分数占比, 第三个是具体分数
      const data = scoreList[0].match(/>.+</g)
      let currentIndex = 0
      const len = data.length
      for (let i = 0; i < len / 3; i++) {
        const scoreDetail = {
          type: '',
          rate: '',
          score: ''
        }
        scoreDetail.type = data[currentIndex++].replace('>【', '').replace('】<', '').trim()
        scoreDetail.rate = data[currentIndex++].replace('&nbsp;<', '').replace('>', '')
        scoreDetail.score = data[currentIndex++].replace('&nbsp;<', '').replace('>', '')
        that.scoreList.push(scoreDetail)
      }
    }).catch(e => {
      console.log(e)
      that.$refs.reload.needReload(e)
    }).finally(() => {
      nav.loadSuccess()
    })
  }
}
</script>

<style lang="scss">
.score-detail-info-title{
  font-size: $uni-font-size-lg;
  color: $uni-color-primary;
}
.score-detail-info-more{
  > view {
    margin: 20rpx 0;
    font-size: $uni-font-size-sm;
    > text:last-child{
      margin-left: 5rpx;
      color: $uni-text-color-grey;
    }
  }
}
.score-detail-info{
  width: 600rpx;
  margin: 40rpx auto;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  background-color: #ffffff;
}
.score-detail-table-normal{
  font-size: $uni-font-size-base;
  color: $uni-text-color-grey;
}
.score-detail-table-header{
  font-size: $uni-font-size-base;
  margin-top: 30rpx;
}
.score-detail-title{
  font-size: $uni-font-size-lg;
  color: $uni-color-primary;
}
.score-detail-table-row{
  width: 600rpx;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  > view {
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
  }
  &:first-child{
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
  }
  &:last-child{
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
  }
}
</style>
