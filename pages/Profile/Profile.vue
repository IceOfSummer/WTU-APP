<template>
  <view>
    <view @click="jump('/pages/SchoolAuth/SchoolAuth')" v-if="!schoolToken">登录教务系统</view>
    <view style="color: red" @click="logout" v-else>注销教务系统登录</view>
    <view>{{schoolToken}}</view>
    <view @click="jump('/pages/Auth/Auth')">登录</view>
  </view>
</template>

<script>
import { useStore } from 'vuex'
import { LOG_OUT } from '../../store/mutations-type'
import { computed } from 'vue'

export default {
  name: 'MyProfile',
  setup () {
    const store = useStore()
    /**
     * 跳转到指定页面
     * @param path {string} url
     */
    const jump = (path) => {
      uni.redirectTo({ url: path })
    }

    /**
     * 登出
     */
    const logout = () => {
      store.commit(LOG_OUT)
      uni.showToast({
        title: '注销成功',
        icon: 'none',
        position: 'bottom'
      })
    }

    return {
      jump,
      schoolToken: computed(() => store.state.schoolToken),
      logout
    }
  },
  onShow () {
  }
}
</script>

<style>

</style>
