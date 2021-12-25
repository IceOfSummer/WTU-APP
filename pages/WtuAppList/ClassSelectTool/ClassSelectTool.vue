<template>
  <view>
    <button @click="getClassListFromServer">查询</button>
    <view>
      <text>{{classList}}</text>
    </view>
  </view>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getClassList, initClassSelect, initClassSelect2 } from '../../../api/classSelect'
import { useStore } from 'vuex'
import { PROXY_SCHOOL_APP_AJAX } from '../../../store/actions-type'
import { LOAD_CLASS_QUERY_INFO_1, LOAD_CLASS_QUERY_INFO_2 } from '../../../store/mutations-type'

export default {
  name: 'ClassSelectTool',
  setup () {
    const store = useStore()

    const curYear = new Date().getFullYear()
    const yearRange = [curYear - 4, curYear - 3, curYear - 2, curYear - 1, curYear]
    const yearSelect = ref(curYear)

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
        }



      }).catch(e => console.log(e))
    }

    /**
     * 从服务器获取选课第二部分参数
     */
    function getSecondInitParamFromServer() {
      return store.dispatch(PROXY_SCHOOL_APP_AJAX, initClassSelect2(id, xszxzt, store.state.eduSystemUser.username, store.state.eduSystemUser.token)).then(resp => {
        store.commit(LOAD_CLASS_QUERY_INFO_2, resp)
        console.log(store.state.classSelectInfo.queryParam2)
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
      store.dispatch(PROXY_SCHOOL_APP_AJAX, getClassList(store, 2020)).then(resp => {
        classList.value = resp
      })
    }



    onMounted(() => {
      uni.showModal({
        title: '提示',
        content: '该功能仍在测试中, 即使是选择成功了也请前往官网检查一遍!'
      })
    })
    return {
      getClassListFromServer,
      classList
    }
  }
}
</script>

<style>

</style>
