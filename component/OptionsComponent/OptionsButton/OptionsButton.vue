<template>
  <button class="options-button" hover-class="options-button-hover">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'OptionsButton'
}
</script>

<style lang="scss">
@import "../OptionStyle";
.options-button{
  width: 630rpx;
  height: 98rpx;
  border-radius: 49rpx;
  margin-top: 30rpx;
  color: #fff;
  border: none;
  transition: background-color 0.3s;
  background-color: $uni-color-primary;
}
.options-button-hover{
  background-color: #a9d2ff !important;
}
</style>
