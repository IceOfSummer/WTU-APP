<template>
  <view>
    <view v-if="initStatus === 1">
      <view v-for="(item, index) in classList" :key="index">
        <animated-collapse :title="item.kcmc" :first-open-promise="getClassDetailCallback" :class-back-args="{ item, store }" :collapse-id="xkkz_id + index">
          <template #default="{data}">
            <view v-if="!data" class="text-error text-to-center">
              <text @click="getClassDetailCallback({item, store})">获取课程信息失败, 点我重试</text>
            </view>
            <view class="class-select-collapse-block" v-else>
              <view :style="`color: ${Number.parseInt(data.jxbrl) > Number.parseInt(item.yxzrs) ? '#007aff' : '#dd524d'}`">
                <text>已选{{item.yxzrs}}/{{data.jxbrl}}</text>
              </view>
              <view>
                <text>{{parseClassTime(data)}}</text>
              </view>
              <view>
                <text>{{data.jsxx}}</text>
              </view>
              <view>
                <button class="class-select-btn" @click="trySelectClass(item, data)">抢课</button>
              </view>
            </view>
          </template>
        </animated-collapse>
        <options-divider/>
      </view>
      <options-button @click="getClassListFromServer" v-if="classList.length === 0">
        <text >加载可选课程</text>
      </options-button>
      <options-button @click="loadMore" v-else>
        <text>加载更多</text>
      </options-button>
    </view>
    <view v-else-if="initStatus === 0" class="text-to-center text-info">
      <text>加载中</text>
    </view>
    <view v-else class="text-error text-to-center">
      <text @click="retryInit">初始化失败, 点我重试</text>
    </view>
    <loading-mask ref="loading"/>
  </view>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { PROXY_SCHOOL_APP_AJAX } from '../../../store/actions-type'
import { getClassDetail, getClassList, initClassSelect2, selectClass } from '../../../api/schoolApp/classSelect'
import OptionsDivider from '../../../component/OptionsComponent/OptionsDivider/OptionsDivider'
import AnimatedCollapse from '../../../component/AnimatedCollapse/AnimatedCollapse'
import LoadingMask from '../../../component/LoadingMask/LoadingMask'
import { showToast } from '../../../hook/utils/TipUtils'
import OptionsButton from '../../../component/OptionsComponent/OptionsButton/OptionsButton'
import { getInputValue } from '../../../hook/utils/StringUtils'
// 查询时所用的参数对象映射
const paramObjMapping = {
  rwlx: '',
  xkly: '',
  bklx_id: '',
  sfkkjyxdxnxq: '',
  sfkknj: '',
  sfkkzy: '',
  kzybkxy: '',
  sfznkx: '',
  zdkxms: '',
  sfkxq: '',
  sfkcfx: '',
  kkbk: '',
  kkbkdj: '',
  sfkgbcx: '',
  sfrxtgkcxd: '',
  tykczgxdcs: '',
  rlkz: '',
  xkzgbj: '',
  rlzlkz: '',
  xklc: ''
}

export default {
  name: 'ClassList',
  components: { OptionsButton, LoadingMask, AnimatedCollapse, OptionsDivider },
  props: {
    xkkz_id: {
      type: String,
      required: true
    },
    kklxdm: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const loading = ref()
    const CLASS_PARAM_STORAGE_KEY = `ClassListParam-${props.xkkz_id}`

    let paramObj = uni.getStorageSync(CLASS_PARAM_STORAGE_KEY)

    // 课程列表
    const classList = ref([])

    // 记录页数
    let curPageIndex = 1

    /**
     * 由于性能问题, 响应的参数过多,因此需要把选课列表的有用参数分离出来
     * @param list {Array} 课程列表
     * @return {Array}
     */
    function splitUsefulKeyFromClassList (list) {
      const arr = []
      list.forEach(value => {
        arr.push({
          kcmc: value.jxbmc,
          kch_id: value.kch_id,
          xf: value.xf,
          cxbj: value.cxbj,
          fxbj: value.fxbj,
          // 已选人数
          yxzrs: value.yxzrs,
          jxb_id: value.jxb_id
        })
      })
      return arr
    }

    const getClassListFromServer = () => {
      return store.dispatch(PROXY_SCHOOL_APP_AJAX, getClassList(store, paramObj, props.kklxdm, curPageIndex)).then(resp => {
        if (Array.isArray(resp.tmpList)) {
          if (resp.tmpList.length === 0) {
            showToast('没有更多数据了')
          } else {
            const arr = splitUsefulKeyFromClassList(resp.tmpList)
            classList.value = classList.value.concat(arr)
            console.log(classList.value)
          }
        }
      }).catch(e => {
        showToast('加载失败, 请稍后再试')
        console.log(e)
      })
    }

    const getClassDetailCallback = ({ store, item }) => {
      loading.value.showLoading()
      return new Promise(resolve => {
        store.dispatch(PROXY_SCHOOL_APP_AJAX, getClassDetail(store, 2020, item.cxbj, item.fxbj, item.kch_id, props.xkkz_id, props.kklxdm, paramObj)).then(data => {
          data.forEach(value => {
            if (item.jxb_id === value.jxb_id) {
              resolve(value)
            }
          })
          resolve(data[0])
        }).catch(e => {
          console.log(e)
          resolve(null)
        }).finally(() => {
          loading.value.stopLoading()
        })
      })
    }

    /**
     *
     * @param item {Object} 每个课程
     * @param data {Object} 课程详细信息
     */
    const trySelectClass = (item, data) => {
      loading.value.showLoading()
      // (04330069)计算机网络原理 - 4.0 学分
      const kcmc = `(${item.kch_id})${item.kcmc} - ${item.xf} 学分`
      console.log(data)
      store.dispatch(PROXY_SCHOOL_APP_AJAX, selectClass(store, data.do_jxb_id, item.kch_id, kcmc, props.xkkz_id, paramObj)).then(data => {
        console.log(data.flag)
        if (Number.parseInt(data.flag) === 1) {
          console.log('success')
          showToast('选课成功! 请不要重复选课')
        } else {
          showToast('选课失败, 可能是人数已满')
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        loading.value.stopLoading()
      })
    }


    // 初始化状态 0: 加载中, 1:加载成功, 2:加载失败
    const initStatus = ref(0)



    /**
     * 加载相关查询参数
     */
    function loadParam() {
      return store.dispatch(PROXY_SCHOOL_APP_AJAX, initClassSelect2(store, props.xkkz_id)).then(resp => {

        // 装载参数
        Object.keys(paramObjMapping).forEach(key => {
          paramObj[key] = getInputValue(resp, key)
        })
        // 存储到本地
        uni.setStorage({
          key: CLASS_PARAM_STORAGE_KEY,
          data: paramObj
        })

        initStatus.value = 1
      }).catch(e => {
        console.log(e)
        initStatus.value = 2
      })
    }

    /**
     * 检查是否有前置参数, 没有就发ajax查
     */
    if (!paramObj) {
      // 初始化
      paramObj = {}
      loadParam()
    } else {
      initStatus.value = 1
    }

    /**
     * 尝试重新初始化参数
     */
    const retryInit = () => {
      loading.value.showLoading()
      loadParam().finally(() => {
        loading.value.stopLoading()
      })
    }

    const parseClassTime = (data) => {
      if (data && data.sksj) {
        return data.sksj.replace('<br/>', '\n')
      } else {
        return '加载失败'
      }
    }

    const loadMore = () => {
      curPageIndex++
      console.log('++')
      console.log(curPageIndex)
      getClassListFromServer()
    }

    return {
      initStatus,
      loading,
      parseClassTime,
      classList,
      retryInit,
      getClassListFromServer,
      getClassDetailCallback,
      store,
      trySelectClass,
      loadMore
    }

  }
}
</script>

<style>

</style>
