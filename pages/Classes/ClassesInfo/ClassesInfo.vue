<template>
  <view>
    <status-bar/>
    <my-navigator title="课程详细" show-percent ref="nav"/>
    <classes-info-item v-for="(item, index) in detail" :key="index" :detail="item" :type="item.type"/>
  </view>
</template>

<script>

import { useStore } from 'vuex'
import ClassesInfoItem from './ClassesInfoItem'
import MyNavigator from '../../../component/Navigator/Navigator'
import StatusBar from '../../../component/Navigator/StatusBar'

export default {
  name: 'ClassesInfo',
  components: { StatusBar, MyNavigator, ClassesInfoItem },
  data () {
    return {
      detail: []
    }
  },
  onLoad ({ start, week }) {
    const store = useStore()

    /**
     * 获取当前课程由第几节课开始
     * @param classes {Object} 要解析的课程对象
     * @return {number} 第几节课开始上课
     */
    const getStartTime = (classes) => {
      return Number.parseInt(classes.jcs.split('-')[0])
    }
    console.log(start + '---' + week)

    store.state.classes.list.forEach(value => {
      // console.log(value.kcmc + '------' + getStartTime(value) + '-----' + value.xqj)
      if (getStartTime(value) === Number.parseInt(start) && Number.parseInt(value.xqj) === Number.parseInt(week)) {
        this.detail.push(value)
      }
    })
  },
  mounted() {
    this.$refs.nav.loadSuccess()
  }
}
</script>

<style lang="scss">

</style>
