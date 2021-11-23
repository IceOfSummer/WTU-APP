<template>
  <view>
    <form>
      <view class="school-auth-input">
        <text class="school-auth-input-label">用户名</text>
        <input placeholder="用户名" v-model="username"/>
      </view>
      <view class="school-auth-input">
        <text class="school-auth-input-label">密码</text>
        <input type="password" placeholder="密码" v-model="password">
      </view>
      <view class="school-auth-input">
        <text class="school-auth-input-label">验证码</text>
        <view class="school-auth-captcha">
          <input placeholder="验证码" v-model="captcha">
          <image :src="captchaBase64"/>
        </view>
      </view>
      <button @click.prevent="tryLogin">登录</button>
    </form>
  </view>
</template>

<script>
import { ref } from 'vue'
import { getCaptcha, init, login } from '../../api/schoolAuth'
import { wtuEncrypt } from '../../hook/aes'
import useStorage from '../../hook/storage'

export default {
  name: 'SchoolAuth',
  setup () {
    const storage = useStorage()
    const isInitSuccess = ref(false)

    const username = ref('')
    const password = ref('')
    const captcha = ref('')

    let session = null
    let lt = null
    let route = null
    let encryptSalt = null
    /**
     * 初始化登录请求
     */
    const tryInit = () => {
      isInitSuccess.value = false
      init().then(resp => {
        if (resp.code === 0) {
          // success
          isInitSuccess.value = true
          session = resp.data.session
          lt = resp.data.lt
          encryptSalt = resp.data.encryptSalt
          route = resp.data.route
          // 获取验证码
          tryGetCaptcha()
        }
      }).finally(() => {
        if (!isInitSuccess.value) {
          uni.showToast({
            title: '连接服务器失败, 请检查你的网络',
            icon: 'none',
            position: 'bottom'
          })
          // 重试
          setTimeout(() => {
            tryInit()
          }, 5000)
        }
      })
    }
    tryInit()

    const captchaBase64 = ref('')
    /**
     * 尝试获取验证码
     */
    const tryGetCaptcha = () => {
      if (isInitSuccess.value) {
        getCaptcha(session, lt , route).then(resp => {
          captchaBase64.value = resp.data
        })
      }
    }

    const tryLogin = () => {
      if (isInitSuccess.value) {
        const encryptedPassword = wtuEncrypt(password.value, encryptSalt)
        let isLoginSuccess = false
        login(session, lt, encryptedPassword, captcha.value, route, username.value).then(resp => {
          console.log(resp)
          if (resp.code === 0) {
            // success
            isLoginSuccess = true
            storage.schoolToken = resp.data
            uni.showToast({
              title: '登录成功',
              icon: 'none',
              position: 'bottom'
            })
            uni.switchTab({ url: '/pages/Index/Index' })
          } else {
            uni.showToast({
              title: '登录失败,请检查你提交的数据',
              icon: 'none',
              position: 'bottom'
            })
          }
        }).finally(() => {
          console.log(isInitSuccess)
          if (!isLoginSuccess) {
            tryInit()
          }
        })
      }
    }
    return {
      captchaBase64,
      username,
      password,
      captcha,
      tryLogin
    }
  }
}
</script>

<style lang="scss">
.school-auth-captcha{
  display: flex;
  align-items: center;
  image{
    width: 200px;
    height: 100px;
  }
}
.school-auth-input-label{
  color: $uni-color-primary;
}
</style>
