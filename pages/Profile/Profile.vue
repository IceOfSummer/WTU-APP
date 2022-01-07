<template>
  <view class="profile">
    <view class="profile-user">
      <view class="profile-user-options">
        <text class="iconfont" @click="jump('/pages/Profile/ConfigCenter/ConfigCenter')">&#xe600;</text>
      </view>
      <view class="profile-user-info">
        <view class="profile-user-info-block">
          <image :src="headIcon ? headIcon : 'static/image/user.jpg'"/>
          <view class="profile-user-info-detail">
            <text>用户名</text>
            <text>Account Number</text>
          </view>
        </view>
        <view class="profile-user-info-more"></view>
      </view>
    </view>
    <view>
      <profile-app-item title="教务系统" @click="jump('/pages/Profile/EducationSystem/EducationSystem')">&#xe643;</profile-app-item>
      <options-divider/>
    </view>
  </view>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import ProfileAppItem from './ProfileAppItem'
import OptionsDivider from '../../component/OptionsComponent/OptionsDivider/OptionsDivider'

export default {
  name: 'MyProfile',
  components: { OptionsDivider, ProfileAppItem },
  setup () {
    const store = useStore()
    console.log()
    /**
     * 跳转到指定页面
     * @param path {string} url
     */
    const jump = (path) => {
      uni.navigateTo({ url: path })
    }


    return {
      jump,
      schoolToken: computed(() => store.state.schoolToken),
      headIcon: computed(() => store.state.user.headIcon)
    }
  }
}
</script>

<style lang="scss">
.profile-user-info-block{
  display: flex;
  align-items: center;
  > image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #fff;
  }
}
.profile-user-info-more{
  @include right-arrow(white, 30rpx);
}
.profile-user-info-detail{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100rpx;
  box-sizing: border-box;
  padding: 7rpx 0;
  margin-left: 30rpx;
  color: #fff;
  > text:first-child{
    font-size: 30rpx;
  }
  > text:last-child{
    font-size: 28rpx;
  }
}
.profile-user-info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50rpx;
  margin-top: 46rpx;
}
.profile-user-options{
  margin-right: 20rpx;
  margin-top: 20rpx;
  font-size: 52rpx;
  color: #fff;
  text-align: right;
}
.profile-user{
  width: 750rpx;
  height: 340rpx;
  padding-top: var(--status-bar-height);
  background-color: #3d8dfd;
}

</style>
