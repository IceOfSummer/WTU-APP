<template>
  <view>
    <status-bar/>
    <my-navigator show-percent show-back ref="nav" :title="article.title"/>
    <view class="article-page-content">
      <rich-text :nodes="article.html"></rich-text>
<!--      <text v-html="article.html"></text>-->
    </view>
  </view>
</template>

<script>
import StatusBar from '../../component/Navigator/StatusBar'
import MyNavigator from '../../component/Navigator/Navigator'
import getArticle from './Article/index'
export default {
  name: 'ArticlePage',
  components: { MyNavigator, StatusBar },
  mounted() {
    console.log('success')
    this.$refs.nav.loadSuccess()
  },
  data () {
    return {
      article: {

      }
    }
  },
  onLoad ({ id }) {
    this.article = getArticle(id)
    console.log(getArticle(id))
  }
}
</script>

<style lang="scss">
.article-page-content{
  background-color: #fff;
  box-sizing: border-box;
  padding: 20rpx;
}
</style>
