<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed title="首页" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!--单击按钮 弹出 频道弹层  -->
      <!-- <van-icon slot="nav-right" name="wap-nav" @click="showChannelsEdit=true"/> -->
      <!-- 频道标签 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 上拉刷新事件 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- 文章列表,不同的标签页下有不同的列表 -->
          <van-cell v-for="article in currentChannel.articles" :key="article.art_id.toString()" :title="article.title" >
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticles } from '@/api/articles'

export default {
  data () {
    return {
      // 设置tabs默认索引,通过索引找当前频道
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
  computed: {
    // 返回当前频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    // 获取文章列表 ---------------------------------------------

    // 获取频道列表 ---------------------------------------------
    async getChannelsList () {
      try {
        const data = await getUserChannels()
        // 给所有的列表设置时间戳(每次上拉需要) 文章数组(上拉更新后需要push进之前的列表)
        // forEach 遍历给每个频道都加入
        data.channels.forEach((channel) => {
          // 当前时间戳 设空(第一次获取没有当前时间戳)
          channel.timestamp = null
          // 文章列表
          channel.articles = []
        })
        // 将获取的频道赋值给 data()中绑定的channels[循环列表]
        this.channels = data.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 上拉事件 -------------------------------------------------
    async onLoad () {
      // 发送请求 - 获取频道列表
      // 获取当前频道对象 - 因是变动值(每次上拉更新)需设计算属性
      // computed 中
      const data = await getArticles({
        // 获取参数 id 时间戳 是否置顶 === 赋值
        // id : 计算属性[获取上拉时当前属于哪个频道的id]
        channelId: this.currentChannel.id,
        // 时间戳 : 前一页历史数据 如第一次获取列表赋值最新时间
        timestamp: this.currentChannel.timestamp || Date.now(),
        // // 是否包含置顶 - 1置顶 ，0不包含置顶
        withTop: 1
      })
      // 获取最后一条列表的时间戳 赋值 文章列表当前时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      // 将获取到的文章push添加到之前列表中
      this.currentChannel.articles.push(...data.results)
      // 加载完成后 loading关闭
      this.loading = false
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
