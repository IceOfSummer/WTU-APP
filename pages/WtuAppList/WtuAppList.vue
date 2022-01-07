<template>
  <view>
    <status-bar/>
    <my-navigator title="其它应用"/>
    <view class="wtu-app">
      <wtu-app-list-block title="推荐">
        <wtu-app-list-block-item title="查询空闲教室" @click="navTo('EmptyClassroomQuery')">&#xe661;</wtu-app-list-block-item>
        <wtu-app-list-block-item title="成绩查询"  @click="navTo('ScoreQuery')">&#xe65e;</wtu-app-list-block-item>
        <wtu-app-list-block-item title="选课工具" @click="navTo('ClassSelectTool')">&#xe668;</wtu-app-list-block-item>
        <wtu-app-list-block-item title="登录教务系统" @click="showToast('敬请期待')">&#xe67a;</wtu-app-list-block-item>
      </wtu-app-list-block>
    </view>
  </view>
</template>

<script>
import WtuAppListBlock from './WtuAppListBlock'
import WtuAppListBlockItem from './WtuAppListBlockItem'
import { useStore } from 'vuex'
import { showToast } from '../../hook/utils/TipUtils'
import MyNavigator from '../../component/Navigator/Navigator'
import StatusBar from '../../component/Navigator/StatusBar'
export default {
  name: 'WtuAppList',
  components: { StatusBar, MyNavigator, WtuAppListBlockItem, WtuAppListBlock },
  setup () {
    const store = useStore()
    const navTo = (name) => {
      // 检查是否登录
      if (store.state.eduSystemUser.isUsableToken) {
        // 已登录
        uni.navigateTo({ url: `/pages/WtuAppList/${name}/${name}` })
      } else {
        // 未登录
        uni.showToast({
          title: '请先登录教务系统',
          icon: 'none',
          position: 'bottom'
        })
        uni.navigateTo({ url: '/pages/SchoolAuth/SchoolAuth' })
      }
    }

    return {
      navTo,
      showToast
    }
  }
}
</script>

<style lang="scss">
.wtu-app{
  padding: 15rpx;
  box-sizing: border-box;
}
</style>
