<template>
  <view>
    <my-navigator title="成绩查询" show-back/>
    <view class="score-query">
      <view class="score-query-picker">
        <picker :range="scoreRange" :value="curSelectIndex" @change="termChangeEvent">
          <text class="iconfont">&#xe6b9;</text>
          {{scoreRange[curSelectIndex]}}
        </picker>
      </view>
      <score-block title="专业必修课" :scores="majorSubject"/>
      <score-block title="实践课" :scores="practiceSubject"/>
      <score-block title="通识课" :scores="normalSubject"/>
      <score-block title="选修课" :scores="optionalSubject"/>
      <view v-if="isEmpty" class="score-query-tip">
        <text>没有相关学期的成绩, 请切换其它学期</text>
      </view>
      <view v-else class="score-query-tip-info">
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
import { showToast } from '../../../hook/utils/TipUtils'
import LoadingMask from '../../../component/LoadingMask/LoadingMask'
import MyNavigator from '../../../component/Navigator/Navigator'

export default {
  name: 'ScoreQuery',
  components: { MyNavigator, LoadingMask, ScoreBlock },
  setup () {
    const store = useStore()

    // 加载条组件
    const mask = ref()
    let showLoading = null
    let stopLoading = null

    onMounted(() => {
      showLoading = mask.value.showLoading
      stopLoading = mask.value.stopLoading
    })

    const cur = new Date()
    // 1: 上学期 2: 下学期
    const term = getCurTerm()
    const curYear = cur.getFullYear()
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
        store.state.eduSystemUser.username, store.state.eduSystemUser.token, index % 2 + 1))
    }

    // 专业必修课
    const majorSubject = ref([])
    const MAJOR_SUBJECT_KEY = '专业课'
    // 普通通识课
    const normalSubject = ref([])
    const NORMAL_SUBJECT_KEY = '通识课'
    // 实践课
    const practiceSubject = ref([])
    const PRACTICE_SUBJECT_KEY = '实践课'
    // 选修课
    const optionalSubject = ref([])
    const OPTIONAL_SUBJECT_KEY = '通识选修课'
    // 是否为空
    const isEmpty = ref(false)

    /**
     * 清空成绩信息
     * @param bool {boolean} 设置标记的状态, true代表完全清空
     */
    function setEmpty (bool = false) {
      majorSubject.value = []
      normalSubject.value = []
      practiceSubject.value = []
      optionalSubject.value = []
      isEmpty.value = bool
    }

    watchEffect(() => {
      if (showLoading) {
        showLoading()
      }
      doQueryAjax(curSelectIndex.value).then(resp => {
        if (resp.items) {
          setEmpty ()
          resp.items.forEach(value => {
            switch (value.kclbmc) {
              case MAJOR_SUBJECT_KEY :
                majorSubject.value.push(value)
                break
              case NORMAL_SUBJECT_KEY :
                normalSubject.value.push(value)
                break
              case PRACTICE_SUBJECT_KEY :
                practiceSubject.value.push(value)
                break
              case OPTIONAL_SUBJECT_KEY :
                optionalSubject.value.push(value)
                break
            }
          })

          // Arrays.sort
          const sortCallback = (a, b) => {
            let aScore = Number.parseInt(a.cj)
            let bScore = Number.parseInt(b.cj)

            if (isNaN(aScore)) {
              aScore = isNaN(aScore) && '及格' === a ? 100 : 0
            }
            if (isNaN(bScore)) {
              bScore = isNaN(bScore) && '及格' === b ? 100 : 0
            }

            return bScore - aScore

          }

          if (majorSubject.value.length === 0 && normalSubject.value.length === 0 && practiceSubject.value.length === 0 && optionalSubject.value.length === 0) {
            console.log('empty')
            isEmpty.value = true
            return
          }

          // sort
          majorSubject.value = majorSubject.value.sort(sortCallback)
          normalSubject.value = normalSubject.value.sort(sortCallback)
          practiceSubject.value = practiceSubject.value.sort(sortCallback)
          optionalSubject.value = optionalSubject.value.sort(sortCallback)

        } else {
          console.log('empty')
          isEmpty.value = true
          showToast('加载失败, 请重试')
        }
      }).catch((e) => {
        console.log(e)
        setEmpty(true)
      }).finally(() => {
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
      majorSubject,
      normalSubject,
      practiceSubject,
      optionalSubject,
      isEmpty,
      mask
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
