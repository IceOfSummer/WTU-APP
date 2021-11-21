<template>
  <!-- 登录界面 -->
  <view class="auth">
    <view class="auth-header">
      <text class="iconfont auth-logo">&#xe650;</text>
      <text class="auth-logo-title">WTU-App</text>
    </view>
    <view class="auth-tryLogin">
      <input-block placeholder="用户名" v-model:value="username"/>
      <input-block placeholder="密码" v-model:value="password" :type="1"/>
      <view class="captcha-area">
        <input-block placeholder="验证码" v-model:value="captcha" :type="2" class="auth-captcha"/>
        <image :src="captchaImage" @click="flushCaptcha" class="captcha-area-img"></image>
      </view>
      <!-- 这里有莫名其妙的BUG 通过类设置背景颜色设置不了!? -->
      <button class="auth-tryLogin-button" style="background-color: #ffbc42;" hover-class="auth-btn-click" @click="tryLogin">
        <text class="auth-tryLogin-button-text">登 录</text>
      </button>
      <!--   转跳登录页面   -->
      <view class="auth-text-block">
        <text class="auth-tryLogin-options" @tap="toRegister">没有账号?点我注册</text>
      </view>
      <!--   在此处转跳WebView页面   -->
      <view class="auth-text-block">
        <text class="auth-tryLogin-options" @click="jump('https://www.baidu.com')">忘记密码?</text>
      </view>
    </view>
  </view>
</template>

<script>
import InputBlock from './InputBlock'
import {getCaptcha, init, login} from '../../api/auth.js'
import {ref} from 'vue'
import encrypt from '../../hook/aes'

export default {
  name: 'AuthPage',
  components: {
    InputBlock
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const captcha = ref('')
    const captchaImage = ref('')

    let aesPassword = null
    let iv = null
    let session = null
    const isInitSuccess = ref(false)
    /**
     * 初始化验证
     */
    const initAuth = () => {
      init().then(resp => {
        if (resp.code === 0) {
          console.log('初始化')
          // 初始化成功
          aesPassword = resp.data.password
          iv = resp.data.iv
          session = resp.data.session
          isInitSuccess.value = true
          flushCaptcha()
        }
      }).catch(e => console.log(e)).finally(() => {
        if (!isInitSuccess.value) {
          uni.showToast({
            title: '连接服务器失败, 请检查你的网络',
            icon: 'none',
            position: 'bottom'
          })
          // 连接失败后每5秒重试一次
          setTimeout(() => {
            initAuth()
          }, 5000)
        }
      })
    }
    initAuth()

    /**
     * 刷新验证码, 请不要手动调用该方法
     */
    const flushCaptcha = () => {
      if (isInitSuccess.value) {
        getCaptcha(session).then(resp => {
          captchaImage.value = resp.data
        }).catch(() => {
          uni.showToast({
            title: '连接服务器失败, 请检查你的网络',
            icon: 'none',
            position: 'bottom'
          })
        })
      }
    }

    /**
     * 前置检查, 用于检测用户名和密码是否填写、长度是否合格等要求
     * @return {boolean} 是否符合要求
     */
    const preCheck = () => {
      // TODO 检验用户名和密码长度
      return true
    }
    /**
     * 执行登录请求
     */
    const tryLogin = () => {
      if (!preCheck()) {
        // TODO 不符合要求的提示
        return
      }
      const encryptedPassword = encrypt(password.value, aesPassword, iv)
      login(username.value, encryptedPassword, captcha.value, session).then(resp => {
        if (resp.code !== 0) {
          initAuth()
        } else {
          console.log('登录成功')
        }
        console.log(resp)
      }).catch(() => {
        initAuth()
      })
    }
    return {
      username,
      password,
      tryLogin,
      captcha,
      captchaImage: captchaImage,
      flushCaptcha
    }
  }
}
</script>

<style lang="scss">
.captcha-area-img{
  background-color: white;
}
.captcha-area{
  display: flex;
  justify-content: space-between;
  align-items: center;
  image {
    width: 200rpx;
    height: 100rpx;
    padding-right: 30rpx;
  }
}
.auth-captcha{
  width: 300rpx !important;
}
.auth-btn-click{
  background-color: #ffd287;
}
.auth-text-block{
  text-align: center;
}
.auth-tryLogin-options {
  margin-top: 46rpx;
  color: #ffffff;
  font-size: 28rpx;
}

.auth-tryLogin-button-text {
  color: #fefefe;
  font-size: 30rpx;
}

.auth-tryLogin-button {
  width: 661 rpx;
  height: 102 rpx;
  border-radius: 50rpx;
  border-width: 0;
  margin-top: 23rpx;
}


.auth-tryLogin {
  justify-content: center;
  align-items: center;
}

.auth-logo-title {
  margin-top: 22rpx;
  font-size: 40rpx;
  opacity: 0.9;
  color: #fff;
}

.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750rpx;
  height: 100vh;
  background-image: linear-gradient(to right, #3494E6, #EC6EAD);
}

.auth-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 208rpx;
}

.auth-logo {
  font-size: 100rpx;
  color: white;
}
</style>
