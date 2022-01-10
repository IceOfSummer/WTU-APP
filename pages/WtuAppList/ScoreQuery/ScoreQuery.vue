<template>
  <view>
    <status-bar/>
    <reload-mask reload-url="/pages/WtuAppList/ScoreQuery/ScoreQuery" ref="reload"/>
    <my-navigator title="成绩查询" show-back ref="nav" show-percent/>
    <view class="score-query">
      <view class="score-query-picker">
        <picker :range="scoreRange" :value="curSelectIndex" @change="termChangeEvent">
          <text class="iconfont">&#xe6b9;</text>
          {{scoreRange[curSelectIndex]}}
        </picker>
      </view>
      <!-- 此处对二维数组进行遍历 -->
      <view v-for="(items, index) in scores" :key="index">
        <score-block :title="items[0].kcxzmc" :scores="items"/>
      </view>
      <view v-if="isEmpty" class="score-query-tip">
        <text>没有相关学期的成绩, 请切换其它学期</text>
      </view>
      <view v-else class="score-query-tip-info">
        <text>点击某项成绩即可查看详细</text>
        <br/>
        <text>成绩大于等于75分用绿色标记, 60分到75分为橙色, 小于60分为红色</text>
      </view>
      <loading-mask ref="mask"/>
    </view>
  </view>
</template>

<script>
import { onMounted, ref, watchEffect } from 'vue'
import ScoreBlock from './ScoreBlock'
import { useStore } from 'vuex'
import { PROXY_SCHOOL_APP_AJAX } from '../../../store/actions-type'
import { getCurTerm } from '../../../hook/utils/DateUtils'
import { getStudentScore } from '../../../api/schoolApp/scoreQuery'
import LoadingMask from '../../../component/LoadingMask/LoadingMask'
import MyNavigator from '../../../component/Navigator/Navigator'
import ReloadMask from '../../../component/ReloadMask/ReloadMask'
import StatusBar from '../../../component/Navigator/StatusBar'

export default {
  name: 'ScoreQuery',
  components: { StatusBar, ReloadMask, MyNavigator, LoadingMask, ScoreBlock },
  setup () {
    const store = useStore()
    const reload = ref()
    const nav = ref()

    // 加载条组件
    const mask = ref()
    let showLoading = null
    let stopLoading = null

    onMounted(() => {
      showLoading = mask.value.showLoading
      stopLoading = mask.value.stopLoading
      nav.value.viewInitSuccess()
    })

    const cur = new Date()
    // 1: 上学期 2: 下学期
    const term = getCurTerm()
    // 减一个学期
    const curYear = cur.getFullYear() - 1
    const scoreRange = [(curYear - 3) + '年上学期', (curYear - 3) + '年下学期', (curYear - 2) + '年上学期', (curYear - 2) + '年下学期',
      (curYear - 1) + '年上学期', (curYear - 1) + '年下学期', curYear + '年上学期', curYear + '年下学期']
    // 计算时将索引除二后向下取整
    const yearMapping = [curYear - 3, curYear - 2, curYear - 1, curYear, curYear]

    const curSelectIndex = ref(term === 1 ? 6 : 7)

    /**
     * 发送查询成绩的ajax请求
     * @param index 选中的索引
     * @return {Promise<any>}
     */
    function doQueryAjax (index) {
      return store.dispatch(PROXY_SCHOOL_APP_AJAX, getStudentScore(yearMapping[Math.floor(index / 2)],
        store.state.eduSystemUser.username, index % 2 + 1))
    }

    // 是否为空
    const isEmpty = ref(false)
    const scores = ref([])

    /**
     * 清空成绩信息
     * @param bool {boolean} 设置标记的状态, true代表完全清空, 即页面会显示请求得到的数据为空
     */
    function setEmpty (bool = false) {
      scores.value = []
      isEmpty.value = bool
    }

    watchEffect(() => {
      if (showLoading) {
        showLoading()
      }
      doQueryAjax(curSelectIndex.value).then(resp => {
        if (resp.items && resp.items.length !== 0) {
          setEmpty()
          /**
           * 存放不同类型的成绩
           * @type {Map<string, Array<Object>>}
           */
          const scoreTypes = new Map()
          resp.items.forEach(value => {
            const classType = value.kcxzmc
            const arr = scoreTypes.get(classType)
            if (arr) {
              arr.push(value)
            } else {
              scoreTypes.set(classType, [value])
            }
          })

          // Arrays.sort
          const sortCallback = (a, b) => {

            /**
             * 检查分数是否为number类型, 若不是则做特殊处理
             * @param score {number|string} 分数
             * @return {number} 分数
             */
            function checkScore(score) {
              let numScore = Number.parseInt(score)
              if (isNaN(numScore)) {
                if (score === '及格' || score === '合格' || score === '优秀') {
                  return 100
                } else {
                  return 0
                }
              }
              return numScore
            }

            return checkScore(b.cj) - checkScore(a.cj)
          }

          // 分类完后装进ref数据中
          scoreTypes.forEach(value=> {
            // 排个序
            value.sort(sortCallback)
            scores.value.push(value)
          })

        } else if (resp.items) {
          setEmpty(true)
        }
      }).catch((e) => {
        reload.value.needReload(e)
        setEmpty(true)
      }).finally(() => {
        nav.value.loadSuccess()
        if (stopLoading) {
          stopLoading()
        }
      })
    })


    const termChangeEvent = (event) => {
      curSelectIndex.value = event.detail.value
    }

    return {
      scoreRange,
      curSelectIndex,
      termChangeEvent,
      scores,
      isEmpty,
      mask,
      reload,
      nav
    }
  }
}
</script>

<style lang="scss">
.score-query-tip-info{
  padding: 40rpx;
  font-size: 20rpx;
  text-align: center;
  color: $uni-text-color-grey;
}
.score-query-tip{
  padding: 40rpx;
  font-size: 24rpx;
  text-align: center;
  color: $uni-color-primary;
}
.score-query{
  background-color: #fff;
}
.score-query-picker{
  font-size: 24rpx;
  margin-right: 30rpx;
  color: $uni-text-color-grey;
  text-align: end;
}
</style>
