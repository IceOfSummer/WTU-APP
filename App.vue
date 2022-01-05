<script>
import { getVersion } from './api/appVersion'
import { showToast } from './hook/utils/TipUtils'
import { getServerUrl } from './hook/utils/serverUtils'
export default {
  data () {
    return {
      newVersionPath: ''
    }
  },
  onLaunch: function() {
    const serverUrl = getServerUrl()
    const that = this

    // 检查更新
    getVersion().then(resp => {
      const newVersion = resp.data.versionCode
      plus.runtime.getProperty(plus.runtime.appid, (inf) => {
        console.log(`当前版本: ${inf.versionCode}, 最新版本: ${newVersion}`)

        if (newVersion - Number.parseInt(inf.versionCode) >= 1) {
          downLoadNewVersion(resp.data.versionName)
        }
      })
    }).catch(e => console.log(e))

    /**
     * 下载新版本
     * @param versionName {string}
     */
    function downLoadNewVersion (versionName) {
      console.log('downloading: ' + versionName)
      uni.downloadFile({
        url: `${serverUrl}/vcs/app/hotUpdate/${versionName}`,
        success (result) {
          console.log(result)
          if (result.statusCode === 200) {
            that.newVersionPath = result.tempFilePath
          }
        }
      })
    }

  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    // 隐藏APP后直接更新
    if (this.newVersionPath) {
      plus.runtime.install(this.newVersionPath, {
        force: false
      }, function() {
        console.log('install success...')
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
