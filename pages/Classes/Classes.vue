<template>
  <view>
    <view class="classes-header">
      <view>
        <text>星期一</text>
        <text>星期二</text>
        <text>星期三</text>
        <text>星期四</text>
        <text>星期五</text>
        <text>星期六</text>
        <text>星期日</text>
      </view>
      <view>
        <text v-for="(item, index) in calendar" :key="index">{{item}}</text>
      </view>
    </view>
    <view class="classes">
      <view class="classes-container-sidebar">
        <view>
          <text>1</text>
          <text>08:00</text>
          <text>08:45</text>
        </view>
        <view>
          <text>2</text>
          <text>08:50</text>
          <text>09:35</text>
        </view>
        <view>
          <text>3</text>
          <text>09:55</text>
          <text>10:40</text>
        </view>
        <view>
          <text>4</text>
          <text>10:45</text>
          <text>11:30</text>
        </view>
        <view>
          <text>5</text>
          <text>11:35</text>
          <text>12:20</text>
        </view>
        <view>
          <text>6</text>
          <text>14:00</text>
          <text>14:45</text>
        </view>
        <view>
          <text>7</text>
          <text>14:50</text>
          <text>15:35</text>
        </view>
        <view>
          <text>8</text>
          <text>15:55</text>
          <text>16:40</text>
        </view>
        <view>
          <text>9</text>
          <text>16:45</text>
          <text>17:30</text>
        </view>
        <view>
          <text>10</text>
          <text>19:00</text>
          <text>19:45</text>
        </view>
        <view>
          <text>11</text>
          <text>19:50</text>
          <text>20:35</text>
        </view>
        <view>
          <text>12</text>
          <text>20:40</text>
          <text>21:35</text>
        </view>
      </view>
      <view class="classes-container">
        <class-item v-for="(item, index) in classesData" :key="index" :detail="item"/>
      </view>
    </view>
  </view>
</template>

<script>
import ClassItem from './ClassItem'
import { computed, ref } from 'vue'
import { getClasses } from '../../api/schoolApp'
import { useStore } from 'vuex'
import { SET_CLASSES, SET_CLASSES_OPTIONS } from '../../store/mutations-type'
import { ADJUST_CUR_WEEK, PROXY_SCHOOL_APP_AJAX } from '../../store/actions-type'

const getClassFromServer = (store) => store.dispatch(PROXY_SCHOOL_APP_AJAX, getClasses(store.state.classes.classesOptions.year,
    store.state.classes.classesOptions.term, store.state.eduSystemUser.username, store.state.eduSystemUser.token)).then(resp => {
    if (resp.kbList) {
      // 保存到vuex
      store.commit(SET_CLASSES, resp.kbList)
      uni.showToast({
        title: '刷新成功',
        icon: 'none',
        position: 'bottom'
      })
    }
  }).catch(e => {
    console.log(e)
  })


export default {
  name: 'SchoolClasses',
  components: { ClassItem },
  setup () {
    const store = useStore()

    const today = new Date()
    // 1-12
    const curMonth = today.getMonth() + 1
    // 1-31
    const curDate = today.getDate()
    // 星期, 周日为7
    const curDay = today.getDay() === 0 ? 7 : today.getDay()
    // 年份
    const curYear = today.getFullYear()

    // 构建数组
    const calendar = ref([])

    // 计算某一月有多少天
    // 处理周一到周日
    for (let i = 1; i <= 7; i++) {
      const gap = curDay - i
      let tempMonth = curMonth
      let tempDate = curDate - gap
      let tempYear = curYear
      if (tempDate <= 0) {
        tempMonth--
        if (tempMonth <= 0) {
          // year --
          tempYear--
          tempMonth = 12
        }
        tempDate += new Date(tempYear, tempMonth, 0).getDate()
      } else if (tempDate > new Date(tempYear, tempMonth, 0).getDate()) {
        // 超出当月最大值
        tempMonth++
        tempDate = - gap
        if (tempMonth > 12) {
          tempYear++
          tempMonth = 1
        }
      }
      calendar.value.push(`${tempMonth}/${tempDate < 10 ? '0' + tempDate : tempDate}`)
    }

    // 检查设置中是否有空值
    const classesOptions = store.state.classes.classesOptions
    if (!classesOptions.year) {
      store.commit(SET_CLASSES_OPTIONS, { key: 'year', value: new Date().getFullYear() })
    }
    if (!classesOptions.term) {
      const month = new Date().getMonth()
      // 0是一月
      let term = month >= 1 && month < 8 ? 1 : 2
      store.commit(SET_CLASSES_OPTIONS, { key: 'term', value: term })
    }
    if (!classesOptions.curWeek) {
      store.commit(SET_CLASSES_OPTIONS, { key: 'curWeek', value: 1 })
    }

    // 缓存没有保存课表信息, 尝试从服务器获取
    if (store.state.classes.list.length === 0) {
      if (store.state.eduSystemUser.token) {
        // 尝试获取课表
        getClassFromServer(store)
      } else {
        // 未登录
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          position: 'bottom'
        })
      }
    }

    // 尝试校准当前周
    store.dispatch(ADJUST_CUR_WEEK)



    return {
      calendar,
      classesData: computed(() => store.state.classes.list),
      curWeek: computed(() => store.state.classes.classesOptions.curWeek)
    }
  },
  onNavigationBarButtonTap () {
    uni.navigateTo({ url: '/pages/Classes/Options/Options' })
  },
  onPullDownRefresh () {
    const store = useStore()
    if (store.state.eduSystemUser.token) {
      // 尝试获取课表
      getClassFromServer(useStore()).finally(() => {
        uni.stopPullDownRefresh()
      })
    } else {
      // 未登录
      uni.showToast({
        title: '请先登录',
        icon: 'none',
        position: 'bottom'
      })
      uni.stopPullDownRefresh()
    }

  }
}
</script>

<style lang="scss">
$height-per-class: 100rpx;
.classes-header{
  margin-left: 50rpx;
  width: 690rpx;
  margin-right: 10rpx;
  > view {
    display: flex;
    justify-content: space-between;
    > text {
      width: 100rpx;
      font-size: 16rpx;
      text-align: center;
    }
  }
}
.classes-container{
  position: relative;
  width: 690rpx;
  margin-right: 10rpx;
}
.classes{
  display: flex;
  justify-content: space-between;
}
.classes-container-sidebar{
  display: inline-block;
  width: 50rpx;
  > view{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: $height-per-class;
    width: 100%;
    margin-bottom: 10rpx;
    font-size: 16rpx;
    //background-color: cornflowerblue;
    text:first-child{
      font-weight: bold;
    }
  }
}
</style>
