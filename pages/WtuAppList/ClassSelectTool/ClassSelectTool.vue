<template>
  <view class="class-select-tool">
    <button @click="getClassListFromServer">查询</button>
    <view v-for="(item, index) in classList" :key="index" >
      <animated-collapse :title="item.kcmc" :first-open-promise="getClassDetailCallback" :class-back-args="{ item, store }">
        <template #default="{data}">
          {{data}}
        </template>
      </animated-collapse>
      <options-divider/>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'
import { getClassDetail, getClassList, initClassSelect, initClassSelect2 } from '../../../api/schoolApp/classSelect'
import { useStore } from 'vuex'
import { PROXY_SCHOOL_APP_AJAX } from '../../../store/actions-type'
import { LOAD_CLASS_QUERY_INFO_1, LOAD_CLASS_QUERY_INFO_2 } from '../../../store/mutations-type'
import AnimatedCollapse from '../../../component/AnimatedCollapse/AnimatedCollapse'
import OptionsDivider from '../../../component/OptionsComponent/OptionsDivider/OptionsDivider'

export default {
  name: 'ClassSelectTool',
  components: { OptionsDivider, AnimatedCollapse },
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
        console.log(resp)
      })
    }

    const getClassDetailAjax = (item) => {
      store.dispatch(PROXY_SCHOOL_APP_AJAX, getClassDetail(store, 2020, item.cxbj, item.fxbj, item.kch_id)).then(resp => {
        console.log(resp)
      })
    }
    const getClassDetailCallback = ({ store, item }) => {
      return store.dispatch(PROXY_SCHOOL_APP_AJAX, getClassDetail(store, 2020, item.cxbj, item.fxbj, item.kch_id))
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
      getClassDetailAjax,
      getClassDetailCallback,
      store
    }
  }
}
</script>

<style lang="scss">
.class-select-tool{
  background-color: #fff;
}

</style>
