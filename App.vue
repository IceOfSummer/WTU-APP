<script>
import { showToast } from './hook/utils/TipUtils'
import { useStore } from 'vuex'
import { GET_UPDATE_INFO } from './store/actions-type'
import manifest from './manifest.json'
import { CLEAR_APP_UPDATE_INFO } from './store/mutations-type'
export default {
  data () {
    return {
      newVersionPath: ''
    }
  },
  onLaunch: function() {
    const store = useStore()
    store.dispatch(GET_UPDATE_INFO)
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    const store = useStore()
    // 隐藏APP后直接更新
    const wgtPath = store.state.appUpdate.wgtPath
    const minVersionCode = store.state.appUpdate.minVersionCode
    if (manifest.versionCode >= minVersionCode && wgtPath) {
      console.log('1')
      plus.runtime.install(wgtPath, {
        force: false
      }, function() {
        console.log('install success...')
        store.commit(CLEAR_APP_UPDATE_INFO, { path: '', minVersionCode: '' })
        plus.runtime.restart()
      }, function() {
        showToast('安装失败, 请稍后再试')
      })
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* Project id 3002046 */
  src: url('https://at.alicdn.com/t/font_3002046_i0ebbl71qc.ttf?t=1640610109443') format('truetype');
}
.iconfont {
    font-family: iconfont, sans-serif;
}
page{
  background-color: rgb(248, 248, 248);
}
.text-info{
  color: $uni-text-color-grey;
  font-size: $uni-font-size-sm;
}
.text-error{
  color: $uni-color-error;
  font-size: $uni-font-size-sm;
}
.text-to-center{
  text-align: center;
}

</style>
