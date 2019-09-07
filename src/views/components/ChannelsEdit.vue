<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '80%' }"
  >
    hello
  </van-popup>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      // show: true
    }
  }
}
</script>

<style>
</style>
