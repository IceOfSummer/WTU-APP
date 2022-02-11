<template>
  <view class="index">
    <view class="index-status-bar"></view>
    <view class="index-nav">
      <text>首页</text>
    </view>
    <view class="index-calendar">
      <view class="index-calendar-selector number-font">
        <text>{{year}}.{{formatDate(month)}}</text>
      </view>
      <view>
        <view class="index-calendar-row">
          <view>
            <text>日</text>
          </view>
          <view>
            <text>一</text>
          </view>
          <view>
            <text>二</text>
          </view>
          <view>
            <text>三</text>
          </view>
          <view>
            <text>四</text>
          </view>
          <view>
            <text>五</text>
          </view>
          <view>
            <text>六</text>
          </view>
        </view>
        <view class="index-calendar-row" v-for="(items, index) in dateList" :key="index">
          <view v-for="(item, index) in items" :key="index << 1">
            <view :class="{'text-info': !item.type, 'index-calendar-today': item.type && item.val === curDay}" class="number-font">
              <text>{{item.val}}</text>
            </view>
          </view>
        </view>
        <!-- 下外边距 -->
        <view style="height: 100rpx"></view>
      </view>
    </view>
    <movable-area class="index-menu">
      <movable-view direction="vertical" :out-of-bounds="true" y="500rpx" :inertia="true" style="width: 100%">
          <view class="index-menu-content">
            <view class="index-menu-content-drag">
              <view></view>
            </view>
            <view class="index-menu-title">
              <text>新闻</text>
            </view>
            <news-block title="1.1.2更新概况(2022-02-11)">
              <text>- 修复了校准当前周接口</text>
            </news-block>
            <news-block title="重要提示!(2022-01-13)">
              <text>服务器已经备案完毕,因此APP现在可以后台自动热更新了</text>
              <text>APP的v1.1.0更新需要重新下载安装包安装才有效</text>
              <text>如果你发现你的开屏页面还是旧版的"迎接美好的每一天", 请重新下载安装包获取更好的体验</text>
              <text>滑动到底部即可快速跳转下载</text>
            </news-block>
            <news-block title="1.1.1更新概况(2022-01-10)">
              <text>- 重写了更新逻辑</text>
              <text>- 优化了绝大部分应用的错误提示</text>
              <text>- 修复了首页导航栏过低的问题</text>
              <text>- 修复了查询空闲教室的一个翻页bug</text>
            </news-block>
            <view class="index-menu-link">
              <link-block @click="jumpToArticle(0)">APP使用说明</link-block>
              <link-block @click="jumpToBrowser('https://github.com/HuPeng333/WTU-APP')">查看APP代码</link-block>
              <link-block @click="jumpToBrowser('https://xds.fit/vcs/download/android')">重新下载APP</link-block>
            </view>
            <!-- 下外边距 -->
            <view style="height: 500rpx"/>
          </view>
      </movable-view>
    </movable-area>
    <tip-dialog ref="dialog"/>
  </view>
</template>

<script>
import manifest from '../../manifest.json'
import { onMounted, ref } from 'vue'
import { formatDate } from '../../hook/utils/DateUtils'
import NewsBlock from './NewsBlock'
import LinkBlock from './LinkBlock'
import TipDialog from '../../component/MyDialog/TipDialog'
import { useStore } from 'vuex'

export default {
  name: 'HomeIndex',
  components: { TipDialog, LinkBlock, NewsBlock },
  setup() {
    const dialog = ref()
    const store = useStore()

    const jumpToBrowser = (url) => {
      plus.runtime.openURL(url)
    }
    const jumpToArticle = (id) => {
      uni.navigateTo({ url: `/pages/ArticlePage/ArticlePage?id=${id}` })
    }
    const date = new Date()

    const year = ref(date.getFullYear())
    const month = ref(date.getMonth() + 1)
    const curDay = ref(date.getDate())


    // 日历, 用二维数组, 第一纬表示行
    const dateList = ref([])

    uni.loadFontFace({
      family: 'number-font',
      source: `url("${plus.io.convertLocalFileSystemURL('static/font/FZLTHJW.TTF')}")`
    })

    initParam()
    /**
     * 初始化参数
     */
    function initParam () {
      const firstDate = new Date(year.value, month.value - 1, 1)
      // 本月最多有多少天
      const curMonthMaxDay = new Date(year.value, month.value, 0).getDate()
      // 上个月最多有多少天
      let lastMonthMaxDay = new Date(year.value, month.value - 1, 0).getDate()
      // 本月开始的星期
      const curMonthStartDay = firstDate.getDay()

      // 重置
      dateList.value = []
      // 处理第一行
      const firstLineArr = []
      for (let i = 0; i < curMonthStartDay; i++) {
        firstLineArr.push({
          val: lastMonthMaxDay - curMonthStartDay + i + 1,
          // 0: 代表不是本月
          type: 0
        })
      }
      for (let i = 0; i < 7 - curMonthStartDay; i++) {
        firstLineArr.push({
          val: i + 1,
          // 1: 代表是本月
          type: 1
        })
      }
      dateList.value.push(firstLineArr)

      // 后面的行从哪里开始, 即第二行最开始是几号
      let curIndex = 8 - curMonthStartDay
      while (curMonthMaxDay - curIndex > 7) {
        const tempArr = []
        for (let i = 0; i < 7; i++) {
          tempArr.push({
            val: curIndex++,
            type: 1
          })
        }
        dateList.value.push(tempArr)
      }

      // 处理最后一行
      const lastLine = []
      for (curIndex; curIndex <= curMonthMaxDay; curIndex++) {
        lastLine.push({
          val: curIndex,
          type: 1
        })
      }
      const lastLineLength = lastLine.length
      if (lastLineLength < 7) {
        // 没有填满
        for (let i = 0; i < 7 - lastLineLength; i++) {
          lastLine.push({
            val: i + 1,
            type: 0
          })
        }
      }
      dateList.value.push(lastLine)
    }


    onMounted(() => {
      // 检查更新
      const minVersionCode = store.state.appUpdate.minVersionCode
      if (manifest.versionCode < minVersionCode) {
        // 版本太旧
        dialog.value.showDialog({
          title: '发现新版本了!',
          message: '当前版本过低, 需要重新安装安装包下载',
          type: 'success',
          confirmCallback () {
            jumpToBrowser('http://xds.fit/vcs/download/android')
          }
        })
      }
    })

    return {
      version: manifest.versionName,
      jumpToBrowser,
      year,
      month,
      formatDate,
      dateList,
      jumpToArticle,
      curDay,
      dialog
    }
  }
}
</script>

<style lang="scss">
$nav-height: 40rpx;

.index-calendar-today{
  color: $uni-color-primary;
  font-weight: bold;
}
.index-menu-link{
  display: flex;
  justify-content: center;
}
.index-menu-title{
  color: #fff;
  font-size: $uni-font-size-title;
  text-align: center;
  margin-top: 20rpx;
}
.index-menu-content-drag{
  margin-bottom: 20rpx;
  padding: 10rpx 0;
  > view {
    margin: 0 auto;
    width: 72rpx;
    height: 12rpx;
    background-color: #ffffff;
    border-radius: 6rpx;
    opacity: 0.6;
  }
}
.index-menu-content{
  box-sizing: border-box;
  padding: 20rpx;
  width: 100%;
  background-color: #5b7cff;
  border-radius: 64rpx 64rpx 0rpx 0rpx;
}
.index-menu{
  position: fixed;
  top: 220rpx;
  width: 100%;
  height: 500rpx;
}
.number-font{
  font-family: 'number-font';
}
.index-calendar-row{
  margin: 30rpx 0;
  display: flex;
  justify-content: center;
  > view {
    width: 100rpx;
    text-align: center;
    font-size: $uni-font-size-sm;
  }
}
.index-calendar-selector{
  font-size: $uni-font-size-title;
  height: $nav-height;
}
.index-calendar{
  box-sizing: border-box;
  padding: 30rpx;
  margin-top: 20rpx;
  background-color: #fff;
  border-radius: 64rpx 64rpx 0rpx 0rpx;
}
.index{
  background-color: rgb(91, 124, 255);
  width: 100vw;
  height: 100vh;
}
.fast-links{
  margin-top: 40rpx;
  >view {
    text-align: center;
    margin: 20rpx 0;
  }
  color: $uni-color-primary;
}
.index-nav{
  padding-bottom: 10rpx;
  margin-top: 10rpx;
  height: $nav-height;
  font-size: $uni-font-size-subtitle;
  text-align: center;
  color: #fff;
}
.index-status-bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
