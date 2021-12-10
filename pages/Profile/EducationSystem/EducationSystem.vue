<template>
  <view>
    <view class="edu-system-header">
      <view class="edu-system-header-title">
        <text v-if="token && isUsableToken">已登录</text>
        <text v-else-if="token && !isUsableToken">登录失效</text>
        <text v-else>未登录</text>
      </view>
      <view class="edu-system-header-sub-title-text">
        <text v-if="!token || !isUsableToken">登录获取更多支持</text>
      </view>
      <view class="edu-system-header-btn" v-if="!token || !isUsableToken">
        <button @click="jump('/pages/SchoolAuth/SchoolAuth')">登录</button>
      </view>
      <view v-else-if="userInfo.name" class="edu-system-header-info">
        <text>姓名: {{userInfo.name}}</text>
        <text>学号: {{userInfo.idNumber}}</text>
        <text>入学日期: {{userInfo.enterTime}}</text>
      </view>
    </view>
    <view v-if="token">
      <options-block title="退出登录" type="danger" @click="logout"></options-block>
    </view>

  </view>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { getUserInfo } from '../../../api/schoolApp'
import { EDU_SYSTEM_LOG_OUT, INVALID_EDU_SYSTEM_TOKEN } from '../../../store/mutations-type'
import OptionsBlock from '../../../component/OptionsBlock/OptionsBlock'

export default {
  name: 'EducationSystem',
  components: { OptionsBlock },
  setup () {
    const store = useStore()

    const jump = (url) => {
      uni.navigateTo({ url })
    }

    const token = store.state.eduSystemUser.token
    const isUsableToken = store.state.eduSystemUser.isUsableToken
    const username = store.state.eduSystemUser.username

    let userInfo = reactive({
      idNumber: '',
      name: '',
      enterTime: ''
    })

    /**
     * 发送ajax请求, 获取用户信息
     */
    const getUserInfoAjax = () => {
      if (token && isUsableToken) {
        // 获取用户信息
        getUserInfo(username, token).then(resp => {
          // 分离值
          const splitValue = (str) => str.replace('<p class="form-control-static">', '').replace('</p>', '')

          const reg = /<p class="form-control-static">.*<\/p>/g
          const values = resp.match(reg)
          if (values.length === 0) {
            // 请求失败, 登录凭据失效
            store.commit(INVALID_EDU_SYSTEM_TOKEN)
            return
          }

          // 学号
          userInfo.idNumber = splitValue(values[0])
          // 姓名
          userInfo.name = splitValue(values[1])
          // 入学日期
          userInfo.enterTime = splitValue(values[10])

          console.log(userInfo.name)
        })
      }
    }

    getUserInfoAjax()



    /**
     * 当登录完成后立即加载用户信息
     */
    watch(() => store.state.eduSystemUser.token, () => {
      if (store.state.eduSystemUser.token) {
        getUserInfoAjax()
      }
    })


    /**
     * 登出
     */
    const logout = () => {
      store.commit(EDU_SYSTEM_LOG_OUT)
    }
    return {
      token: computed(() => store.state.eduSystemUser.token),
      isUsableToken: computed(() => store.state.eduSystemUser.isUsableToken),
      jump,
      userInfo,
      logout
    }
  }
}
</script>

<style lang="scss">
.edu-system-header-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20rpx;
  color: white;
  > text {
    margin-top: 20rpx;
  }
}
.edu-system-header-btn{
  > button {
    margin-top: 50rpx;
    width: 150rpx;
    height: 60rpx;
    border-radius: 50px;
    font-size: 25rpx;
    color: white;
    line-height: 60rpx;
    background-color: rgb(61, 141, 253);
  }
}
.edu-system-header-sub-title-text{
  font-size: 16px;
  text-align: center;
  color: $uni-text-color-grey;
}
.edu-system-header-title{
  font-size: 30px;
  text-align: center;
  color: $uni-color-primary;
}
.edu-system-header{
  height: 327rpx;
  padding-top: 20rpx;
  background-image: linear-gradient(to top, #64b3f4, #c2e59c);
}

</style>
