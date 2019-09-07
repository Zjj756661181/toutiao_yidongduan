<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed title="首页" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!-- 频道标签 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 上拉刷新事件 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- 文章列表,不同的标签页下有不同的列表 -->
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'

export default {
  data () {
    return {
      // 设置tabs默认索引
      activeIndex: 0,
      // 列表
      list: [],
      // 上拉显示加载 默认不显示
      loading: false,
      // 上拉加载完成显示加载成功 默认不显示
      finished: false,
      // 频道列表
      channels: []
    }
  },
  created () {
    this.getChannelsList()
  },
  methods: {
    // 获取文章列表 ---------------------------------------------

    // 获取频道列表 ---------------------------------------------
    async getChannelsList () {
      try {
        const data = await getUserChannels()
        this.channels = data.channels
        // console.log(this.channels)
      } catch (err) {
        console.log(err)
      }
    },
    // 上拉事件 -------------------------------------------------
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
// 在scoped中书写的样式，动态生成的标签或者子组件中不可用
// 深度作用选择器   /deep/
// .van-tabs /deep/ .van-tabs__content {
//   margin-top: 46px;
//   margin-bottom: 50px;
//   .van-tabs {
//     /deep/ .van-tabs__wrap {
//       position: fixed;
//       top: 46px;
//       left: 0;
//       z-index: 100;
//     }
//     /deep/ .van-tabs__content {
//       margin-top: 90px;
//       margin-bottom: 50px;
//     }
//   }
// }
// --------------------------------------------------
.van-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 16px;
  z-index: 2;
}
.van-tabs /deep/ .van-tabs__content {
  margin-top: 90px;
  margin-bottom: 50px;
}
.close {
  float: right;
}
</style>
