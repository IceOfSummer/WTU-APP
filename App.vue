<script>
import { getVersion } from './api/appVersion'
import manifest from './manifest.json'
import { showToast } from './hook/utils/TipUtils'
export default {
  onLaunch: function() {
    /**
     * 下载新版本
     * @param versionName {string}
     */
    function downLoadNewVersion (versionName) {
      uni.downloadFile({
        url: manifest.serverUrl + `/app/hotUpdate/${versionName}.wgt`,
        success (result) {
          if (result.statusCode === 200) {
            plus.runtime.install(result.tempFilePath, {
              force: false
            }, function() {
              console.log('install success...')
              plus.runtime.restart()
            }, function(e) {
              console.error(e)
            })
          }
        }
      })
    }

    // 检查更新
    getVersion().then(resp => {
      const temp = resp.data.versionCode - manifest.versionCode
      if (temp >= 1) {
        uni.showModal({
          title: '发现新版本! 是否需要更新?',
          content: `当前版本: ${manifest.versionCode}, 最新版本: ${resp.data.versionCode}`,
          success ({ confirm }) {
            if (confirm) {
              // 确定更新
              showToast('正在下载中, 下载完毕后会自动安装并重启')
              downLoadNewVersion(resp.data.versionName)
            }
          }
        })
      }
    }).catch(e => console.log(e))
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
@font-face {
  font-family: 'iconfont';  /* Project id 3002046 */
  src: url('https://at.alicdn.com/t/font_3002046_ongq5c6zkun.ttf?t=1639734647892') format('truetype');
}
.iconfont {
    font-family: iconfont, sans-serif;
}
page{
  background-color: rgb(248, 248, 248);
}

</style>
