<script>
import { useStore } from 'vuex'
import { LOAD_LOCAL_STORAGE } from './store/mutations-type'
export default {
  onLaunch: function() {
    const store = useStore()
    store.commit(LOAD_LOCAL_STORAGE)
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
	/*每个页面公共css */
  @font-face {
    font-family: 'iconfont';  /* Project id 2550207 */
    src: url('https://at.alicdn.com/t/font_2550207_u7ma3buwhw.woff2?t=1637418107679') format('woff2'),
    url('https://at.alicdn.com/t/font_2550207_u7ma3buwhw.woff?t=1637418107679') format('woff'),
    url('https://at.alicdn.com/t/font_2550207_u7ma3buwhw.ttf?t=1637418107679') format('truetype');
  }
.iconfont {
    font-family: iconfont, sans-serif;
}
</style>
