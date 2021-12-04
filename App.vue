<script>

export default {
  onLaunch: function() {
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
  font-family: 'iconfont';  /* Project id 2550207 */
  src: url('https://at.alicdn.com/t/font_2550207_tcmrufsdjo.woff2?t=1638606270083') format('woff2'),
  url('https://at.alicdn.com/t/font_2550207_tcmrufsdjo.woff?t=1638606270083') format('woff'),
  url('https://at.alicdn.com/t/font_2550207_tcmrufsdjo.ttf?t=1638606270083') format('truetype');
}
.iconfont {
    font-family: iconfont, sans-serif;
}
page{
  background-color: rgb(248, 248, 248);
}
.options-block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  //border-top: 1px solid $uni-border-color;
  > text{
    color: $uni-text-color-grey;
    font-size: 20px;
  }
}
</style>
