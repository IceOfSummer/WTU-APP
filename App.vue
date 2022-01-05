<script>
import { getVersion } from './api/appVersion'
import manifest from './manifest.json'
import { showToast } from './hook/utils/TipUtils'
import { formatSize } from './hook/utils/StringUtils'
import { getServerUrl } from './hook/utils/serverUtils'
export default {
  onLaunch: function() {
    const serverUrl = getServerUrl()

    // 检查更新
    getVersion().then(resp => {
      const curVersion = manifest.versionCode
      const newVersion = resp.data.versionCode
      const size = resp.data.size
      const temp = newVersion - curVersion
      console.log(`当前版本: ${curVersion}, 最新版本: ${newVersion}`)
      if (temp >= 1) {
        uni.showModal({
          title: '发现新版本! 是否需要更新?',
          content: `当前版本: ${curVersion}, 最新版本: ${newVersion}\n大小: ${formatSize(size)}`,
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

    /**
     * 下载新版本
     * @param versionName {string}
     */
    function downLoadNewVersion (versionName) {
      console.log(`${serverUrl}/vcs/app/hotUpdate/${versionName}`)
      uni.downloadFile({
        url: `${serverUrl}/vcs/app/hotUpdate/${versionName}`,
        success (result) {
          console.log(result)
          if (result.statusCode === 200) {
            plus.runtime.install(result.tempFilePath, {
              force: false
            }, function() {
              console.log('install success...')
              plus.runtime.restart()
            }, function() {
              showToast('安装失败, 请稍后再试')
            })
          }
        }
      })
    }

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
  font-size: 22rpx;
}
.text-error{
  color: $uni-color-error;
  font-size: 22rpx;
}
.text-to-center{
  text-align: center;
}

</style>
