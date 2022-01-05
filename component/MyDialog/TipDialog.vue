<template>
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog  :type="type" :content="message" @close="cancelEvent" @confirm="confirmEvent"></uni-popup-dialog>
  </uni-popup>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TipDialog',
  props: {
    message: String,
    type: {
      type: String,
      default: 'warn'
    }
  },
  emits: ['confirm', 'cancel'],
  setup (props, { emit }) {
    const popup = ref()

    const confirmEvent = () => {
      uni.showTabBar()
      popup.value.close()
      emit('confirm')
    }

    const cancelEvent = () => {
      uni.showTabBar()
      popup.value.close()
      emit('cancel')
    }

    const show = () => {
      uni.hideTabBar()
      popup.value.open()
    }

    return {
      popup,
      show,
      confirmEvent,
      cancelEvent
    }
  }
}
</script>

<style>

</style>
