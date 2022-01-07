<template>
  <view>
    <status-bar/>
    <my-navigator show-back title="选课工具"/>
    <view class="class-select-tool">
      <top-collapse :provide-show-only="true" :open="true" ref="collapse" @co-open="reset">
        <view class="class-select-options">
          <view @click="select(1)">
            <text class="iconfont">&#xe6e3;</text>
            <text>&nbsp;&nbsp;选修课&nbsp;&nbsp;</text>
          </view>
          <view @click="select(2)">
            <text class="iconfont">&#xe6e8;</text>
            <text>&nbsp;&nbsp;体育课&nbsp;&nbsp;</text>
          </view>
          <view @click="select(3)">
            <text class="iconfont">&#xe6e7;</text>
            <text>英语分项</text>
          </view>
        </view>
        <view class="text-info text-to-center">
          <text>选择你需要查询的课程分类</text>
        </view>
      </top-collapse>
      <view>
        <class-list v-if="curSelect === 1" storage-key="electiveParam" xkkz_id="D3B144D655222A84E053813B43D3B59D" kklxdm="10"/>
        <class-list v-if="curSelect === 2" storage-key="sportsParam" xkkz_id="D3B675F475E531EDE053813B43D3E9E0" kklxdm="06"/>
        <class-list v-if="curSelect === 3" storage-key="englishParam" xkkz_id="D3B144D655342A84E053813B43D3B59D" kklxdm="07"/>
      </view>
      <loading-mask ref="loading"/>
    </view>
  </view>
</template>

<script>
import { computed, ref } from 'vue'
import {
  initClassSelect,
} from '../../../api/schoolApp/classSelect'
import { useStore } from 'vuex'
import { PROXY_SCHOOL_APP_AJAX } from '../../../store/actions-type'
import { LOAD_CLASS_QUERY_INFO_1 } from '../../../store/mutations-type'
import LoadingMask from '../../../component/LoadingMask/LoadingMask'
import TopCollapse from '../../../component/TopCollapse/TopCollapse'
import ClassList from './ClassList'
import MyNavigator from '../../../component/Navigator/Navigator'
import StatusBar from '../../../component/Navigator/StatusBar'

export default {
  name: 'ClassSelectTool',
  components: { StatusBar, MyNavigator, ClassList, TopCollapse, LoadingMask },
  setup () {
    const store = useStore()
    const loading = ref()
    const collapse = ref()


    console.log(store.state.classSelectInfo.queryParam1)
    // 加载哪个选课类型
    const curSelect = ref(0)

    const isInitSuccess = ref(false)

    /**
     * 从服务器获取选课第一部分参数
     */
    function getFirstInitParamFromServer() {
      return store.dispatch(PROXY_SCHOOL_APP_AJAX, initClassSelect(store.state.eduSystemUser.username, store.state.eduSystemUser.token)).then(resp => {
        store.commit(LOAD_CLASS_QUERY_INFO_1, resp)
        const xszxzt = store.state.classSelectInfo.queryParam1.xszxzt
        if (xszxzt) {
          isInitSuccess.value = true
        }
      }).catch(e => console.log(e))
    }


    // 判断是否需要从服务器获取初始化参数
    const xqh_id = store.state.classSelectInfo.queryParam1.xqh_id
    if (!xqh_id) {
      // 初始化
      getFirstInitParamFromServer()
    }

    const select = (val) => {
      collapse.value.closeCollapse()
      curSelect.value = val
    }

    const reset = () => {
      curSelect.value = 0
    }


    return {
      store,
      loading,
      curSelect,
      select,
      collapse,
      xkkz_id: computed(() => store.state.classSelectInfo.queryParam1.xkkz_id),
      reset
    }
  }
}
</script>

<style lang="scss">
.class-select-options{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30rpx 0;
  > view{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > text:first-child{
      font-size: 40rpx;
      color: $uni-color-primary;
    }
    > text:last-child{
      font-size: 24rpx;
      color: skyblue;
    }
  }
}
.class-select-btn{
  width: 150rpx;
  height: 50rpx;
  font-size: 26rpx;
  line-height: 50rpx;
  background-color: $uni-color-primary;
  color: #fff;
}
.class-select-collapse-block{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  width: 100%;
  font-size: 16rpx;
}
.class-select-tool{
  background-color: #fff;
}

</style>
