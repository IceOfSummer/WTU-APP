<template>
  <view class="class-select-tool">
    <button @click="getClassListFromServer" v-if="classList.length === 0">查询</button>
    <view v-for="(item, index) in classList" :key="index" >
      <animated-collapse :title="item.kcmc" :first-open-promise="getClassDetailCallback" :class-back-args="{ item, store }">
        <template #default="{data}">
          <view class="class-select-collapse-block">
            <view :style="`color: ${data.hasLeft ? '#007aff' : '#dd524d'}`">
              <text>{{data.hasLeft ? '可能还有剩余' : '可能已经被选完了'}}</text>
            </view>
            <view>
              <text>{{parseClassTime(data)}}</text>
            </view>
            <view>
              <button class="class-select-btn" @click="trySelectClass(item, data)">抢课</button>
            </view>
          </view>
        </template>
      </animated-collapse>
      <options-divider/>
    </view>
    <button v-if="classList.length > 0" @click="loadNextPage">加载更多</button>
    <loading-mask ref="loading"/>
  </view>
</template>

<script>
import { ref } from 'vue'
import {
  getClassDetail,
  getClassList,
  initClassSelect,
  initClassSelect2,
  selectClass
} from '../../../api/schoolApp/classSelect'
import { useStore } from 'vuex'
import { PROXY_SCHOOL_APP_AJAX } from '../../../store/actions-type'
import { LOAD_CLASS_QUERY_INFO_1, LOAD_CLASS_QUERY_INFO_2 } from '../../../store/mutations-type'
import AnimatedCollapse from '../../../component/AnimatedCollapse/AnimatedCollapse'
import OptionsDivider from '../../../component/OptionsComponent/OptionsDivider/OptionsDivider'
import LoadingMask from '../../../component/LoadingMask/LoadingMask'
import { showToast } from '../../../hook/utils/TipUtils'

export default {
  name: 'ClassSelectTool',
  components: { LoadingMask, OptionsDivider, AnimatedCollapse },
  setup () {
    const store = useStore()
    const loading = ref()

    let curPageIndex = 1

    /**
     * 从服务器获取选课第一部分参数
     */
    function getFirstInitParamFromServer() {
      return store.dispatch(PROXY_SCHOOL_APP_AJAX, initClassSelect(store.state.eduSystemUser.username, store.state.eduSystemUser.token)).then(resp => {
        store.commit(LOAD_CLASS_QUERY_INFO_1, resp)
        console.log(store.state.classSelectInfo.queryParam1)
        const xszxzt = store.state.classSelectInfo.queryParam1.xszxzt
        const id = store.state.classSelectInfo.queryParam1.xkkz_id
        if (!xszxzt || !id) {
          // 初始化失败
          console.log('初始化失败')
          return
        }



      }).catch(e => console.log(e))
    }

    /**
     * 从服务器获取选课第二部分参数
     */
    function getSecondInitParamFromServer() {
      store.dispatch(PROXY_SCHOOL_APP_AJAX, initClassSelect2(store)).then(resp => {
        store.commit(LOAD_CLASS_QUERY_INFO_2, resp)
        // console.log(store.state.classSelectInfo.queryParam2)
      }).catch(e => {
        console.log(e)
      })
    }

    // 判断是否需要从服务器获取初始化参数
    const xqh_id = store.state.classSelectInfo.queryParam1.xqh_id
    const rwlx = store.state.classSelectInfo.queryParam2.rwlx
    if (!xqh_id) {
      // 第一部分没有初始化
      getFirstInitParamFromServer().then(() => {
        getSecondInitParamFromServer()
      })
    } else if (!rwlx) {
      // 只有第二部分没有初始化
      getSecondInitParamFromServer()
    }

    // 课程列表
    const classList = ref([])

    const getClassListFromServer = () => {
      store.dispatch(PROXY_SCHOOL_APP_AJAX, getClassList(store, 2020, curPageIndex)).then(resp => {
        classList.value = resp
        console.log(resp)
      })
    }

    const getClassDetailCallback = ({ store, item }) => {
      return new Promise(resolve => {
        store.dispatch(PROXY_SCHOOL_APP_AJAX, getClassDetail(store, 2020, item.cxbj, item.fxbj, item.kch_id)).then(data => {
          if (data.wtuJsonData) {
            data.wtuJsonData = JSON.parse(data.wtuJsonData.toString().replace(/\\/g, ''))[0]
          }
          resolve(data)
        })
      })

    }

    const trySelectClass = (item, data) => {
      loading.value.showLoading()
      // (04330069)计算机网络原理 - 4.0 学分
      const kcmc = `(${item.kch_id})${item.kcmc} - ${item.xf} 学分`
      console.log(data)
      store.dispatch(PROXY_SCHOOL_APP_AJAX, selectClass(store, data.wtuJsonData.do_jxb_id, item.kch_id, kcmc)).then(data => {
        console.log(data.flag)
        if (Number.parseInt(data.flag) === 1) {
          console.log('success')
          showToast('选课成功! 请不要重复选课')
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        loading.value.stopLoading()
      })
    }

    const parseClassTime = (data) => {
      if (data.wtuJsonData && data.wtuJsonData.sksj) {
        return data.wtuJsonData.sksj.replace('<br/>', '\n')
      } else {
        return '加载失败'
      }
    }

    const loadNextPage = () => {
      curPageIndex++
    }




    // onMounted(() => {
    //   uni.showModal({
    //     title: '提示',
    //     content: '该功能仍在测试中, 即使是选择成功了也请前往官网检查一遍!'
    //   })
    // })
    return {
      getClassListFromServer,
      classList,
      getClassDetailCallback,
      store,
      trySelectClass,
      parseClassTime,
      loading,
      loadNextPage
    }
  }
}
</script>

<style lang="scss">
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
