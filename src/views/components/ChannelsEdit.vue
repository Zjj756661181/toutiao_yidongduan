<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '90%' }"
  >
    <van-cell icon="cross" @click="$emit('input', false)" />
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button round type="danger" size="mini" v-show="!isEdit" @click="isEdit=true">编辑</van-button>
      <van-button round type="danger" size="mini" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item v-for="channel in recommendChannels" :key="channel.id" :text="channel.name">
        <!-- 关闭按钮 -->
        <van-icon slot="icon" class="close-icon" name="close" />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item v-for="channel in channels" :key="channel.id" :text="channel.name" />
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传过来的我的频道
    channels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // show: true
      // 是否是编辑模式
      isEdit: false,
      // 存储所有频道
      allChannels: []
    }
  },
  computed: {
    // 推荐频道
    recommendChannels () {
      // 1.获取我的频道中所有id组成的数组
      // map()遍历数组，返回一个新的数组，新数组中的元素由回调函数中返回的元素组成
      const ids = this.channels.map((channel) => {
        return channel.id
      })
      // 2.filter() 过滤所有频道，把频道id重复出现的项去掉
      // filter() 把满足条件的item，返回组成一个新的数组
      return this.allChannels.filter((channel) => {
        // includes() es6新增，判断数组中是否包含某一项
        return !ids.includes(channel.id)
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 获取所有频道列表
    async loadAllChannels () {
      try {
        // 发送请求
        const data = await getAllChannels()
        // 获取的数据 赋值 全部频道列表
        this.allChannels = data.channels
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
