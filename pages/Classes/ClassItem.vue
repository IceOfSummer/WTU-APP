<template>
    <view class="class-item" :style="'top:' + beginAt * 110 + 'rpx; left:' + week * 100 + 'rpx;height:' + (110 * duration - 10) + 'rpx'" v-if="show" @click="seeDetail">
      <text>{{limitSize(detail.kcmc)}}\n@{{detail.cdmc}}</text>
    </view>
</template>

<script>
import { computed, ref } from 'vue'
import { limitSize } from '../../hook/utils/StringUtils'
import { useStore } from 'vuex'

export default {
  name: 'ClassItem',
  props: {
    /**
     * 响应的json对象
     */
    detail: Object
  },
  setup (props) {
    const store = useStore()

    const strDuration = props.detail.jcs.toString().split('-')

    const start = Number.parseInt(strDuration[0]) - 1
    const end = Number.parseInt(strDuration[1]) - 1


    const beginAt = ref(start)
    const week = ref(Number.parseInt(props.detail.xqj) - 1)
    const duration = ref(end - start + 1)



    // 查看课表详细信息
    const seeDetail = () => {
      uni.navigateTo({
        url: `/pages/Classes/ClassesInfo/ClassesInfo?start=${start + 1}&week=${week.value + 1}`
      })
    }

    /**
     * 检查当前课程所显示的位置是否有其他的课程
     * @return {boolean} 返回true表示有其他的课程
     */
    const checkIsPosRepeat = () => {
      for (let i = 0, len = store.state.classes.list.length; i < len; i++) {
        const curValue = store.state.classes.list[i]
        if (Number.parseInt(curValue.xqj) === week.value + 1) {
          const curStartTime = Number.parseInt(curValue.jcs.split('-')[0])
          if (curStartTime === start + 1 && props.detail.kcmc !== curValue.kcmc) {
            // console.log(`${props.detail.kcmc} ------ ${start} ----- ${week.value}`)
            return true
          }
        }
      }
      return false
    }



    /**
     * 计算当前课程是否需要隐藏
     * @type {ComputedRef<boolean>} 返回true表示显示
     */
    const show = computed(() => {
      if (props.detail.type === 2) {
        // 这个课程没有开始
        if (checkIsPosRepeat()) {
          console.log('hide')
          // 重复了 不显示
          return false
        }
      }
      if (store.state.classes.classesOptions.hideClosedClasses) {
        const curWeek = store.state.classes.classesOptions.curWeek
        const endWeek = Number.parseInt(props.detail.zcd.replace('周', '').split('-')[1])
        // console.log(`${props.detail.kcmc} ------ ${curWeek} ---------- ${endWeek}`)
        return endWeek >= curWeek
      } else {
        return true
      }
    })

    return {
      beginAt,
      week,
      duration,
      seeDetail,
      show
    }
  },
  methods: {
    limitSize
  }
}
</script>

<style lang="scss">
.class-item{
  position: absolute;
  background-color: skyblue;
  width: 90rpx;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 10rpx;
  text-align: center;
  text-wrap: normal;
  text {
    font-size: 16rpx;
  }
}
</style>
