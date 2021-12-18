<template>
  <view class="line-checkbox-item">
    <line-checkbox v-for="(value, index) in weight" :key="index" :value="value" @change="weekChangeEvent"
                   :title="titles[index]" :model-value="defaultSelect ? defaultSelect.includes(index) : false"></line-checkbox>
  </view>
</template>

<script>
import LineCheckbox from './LineCheckbox'
export default {
  name: 'LineCheckBoxGroup',
  components: { LineCheckbox },
  props: {
    titles: Array,
    weight: Array,
    defaultSelect: {
      type: Array,
      default: () => []
    },
    modelValue: Number
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {

    // 当前选中的值总和
    let curSumWeight = 0

    // 处理默认选择
    props.defaultSelect.forEach(value => {
      curSumWeight += 1 << props.weight[value]
      emit('update:modelValue', curSumWeight)
    })
    // console.log(`title: ${props.titles} ----- ${curSumWeight}`)
    /**
     * 当前周改变事件
     * @param val {{ isSelect: boolean, value: number }}
     */
    const weekChangeEvent = (val) => {
      if (val.isSelect) {
        curSumWeight += 1 << val.value
      } else {
        curSumWeight -= 1 << val.value
      }
      emit('update:modelValue', curSumWeight)

    }

    return {
      weekChangeEvent
    }


  }
}
</script>

<style lang="scss">
.line-checkbox-item{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
