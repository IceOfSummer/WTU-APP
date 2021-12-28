<template>
  <view>
    <view :style="`height: ${collapseContentHeight}`" class="top-collapse-content">
      <view :id="id">
        <slot/>
      </view>
    </view>
    <view class="top-collapse-icon" v-if="(provideShowOnly && !openStatus) || (!provideShowOnly)">
      <text class="iconfont" @click="openStatus = !openStatus">&#xe6b9;</text>
    </view>
  </view>
</template>

<script>
import { onMounted, ref, watch } from 'vue'

export default {
  name: 'TopCollapse',
  props: {
    id: {
      type: String,
      default: 'topCollapse'
    },
    open: {
      type: Boolean
    },
    provideShowOnly: Boolean
  },
  emits: ['co-open', 'co-close'],
  setup (props, { emit }) {

    const openStatus = ref(props.open)

    const collapseContentHeight = ref('0')

    const openCollapse = () => {
      openStatus.value = true
    }

    const closeCollapse = () =>{
      openStatus.value = false
    }

    function executeClose () {
      collapseContentHeight.value = '0'
    }

    function executeOpen () {
      uni.createSelectorQuery().select(`#${props.id}`).boundingClientRect(({ height }) => {
        collapseContentHeight.value = height + 'px'
      }).exec()
    }

    watch(openStatus, () => {
      if (openStatus.value) {
        emit('co-open')
        executeOpen()
      } else {
        emit('co-close')
        executeClose ()
      }
      // console.log(collapseContentHeight.value)
    })

    onMounted(() => {
      if (openStatus.value) {
        executeOpen()
      }
    })


    return {
      collapseContentHeight,
      openStatus,
      openCollapse,
      closeCollapse
    }
  }
}
</script>

<style lang="scss">
.top-collapse-content{
  transition: height .5s;
  overflow: hidden;
}
.top-collapse-icon{
  text-align: center;
}
</style>
