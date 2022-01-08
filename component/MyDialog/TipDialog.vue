<template>
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog :hide-cancel="hideCancel" :title="title" :type="type" :content="message" @close="cancelEvent" @confirm="confirmEvent"></uni-popup-dialog>
  </uni-popup>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TipDialog',
  setup () {
    const popup = ref()
    const title = ref('提示')
    const message = ref('')
    const type = ref('warn')
    const hideCancel = ref(false)
    let confirmCallback = null
    let cancelCallback = null

    const confirmEvent = () => {
      uni.showTabBar()
      popup.value.close()
      confirmCallback ? confirmCallback() : ''
    }

    const cancelEvent = () => {
      uni.showTabBar()
      popup.value.close()
      cancelCallback ? cancelCallback() : ''
    }

    /**
     * @param options {{title?: string, message?: string, type?: 'success'|'warn'|'info'|'error',
     * confirmCallback?: function, cancelCallback?: function, hideCancel?: boolean}}
     */
    const showDialog = (options) => {
      uni.hideTabBar()
      popup.value.open()
      title.value = options.title ? options.title : '提示'
      message.value = options.message ? options.message : message.value
      type.value = options.type ? options.type : 'warn'
      hideCancel.value = options.hideCancel ? options.hideCancel : false
      confirmCallback = options.confirmCallback
      cancelCallback = options.cancelCallback
    }

    return {
      popup,
      showDialog,
      confirmEvent,
      cancelEvent,
      message,
      title,
      type,
      hideCancel
    }
  }
}
</script>

<style>

</style>
