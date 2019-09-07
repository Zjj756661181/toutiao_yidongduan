<template>
  <div>
    <!-- 首页 title="首页"-->
    <!-- <van-search placeholder="请输入搜索关键词" v-model="searchValue" background="#3196fa" /> -->
    <van-nav-bar fixed title="首页" />
    <!-- 滚动nav 标签页 -->
    <van-tabs animated v-model="activeIndex">
      <!--单击按钮 弹出 频道弹层  -->
      <van-icon slot="nav-right" name="wap-nav" @click="showChannelsEdit=true"/>
      <!-- 遍历循环 tab 标签页，显示频道列表 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
        >
          <!-- 上拉刷新 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 列表内容 -->
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <!-- 列表图片 -->
              <div slot="label">
                <!-- grid 显示封面 article.cover.type  -->
                <van-grid
                v-if="article.cover.type"
                :border="false"
                :column-num="3">
                  <!-- 图片 -->
                  <van-grid-item v-for="(img,index) in article.cover.images"
                  :key="img + index">
                    <van-image lazy-load height="80" :src="img">
                      <!-- 图片 加载中提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 自定义加载失败提示 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <!-- 底部 -->
                <p>
                  <span>{{ article.aut_name }}</span>&nbsp;
                  <span>{{ article.comm_count }}评论</span>&nbsp;
                  <span>{{ article.pubdate | fmtDate }}</span>&nbsp;
                  <!-- x 图标 -->
                  <van-icon name="cross" class="close" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 举报弹层组件 -->
    <more-action></more-action>
    <!-- 频道弹层组件 -->
    <channels-edit v-model="showChannelsEdit"></channels-edit>
  </div>
</template>

<script>
import Vue from 'vue'
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import { Lazyload } from 'vant'
import MoreAction from '../components/MoreAction'
import ChannelsEdit from '../components/ChannelsEdit'
Vue.use(Lazyload)

export default {
  name: 'HomeIndex',
  components: {
    'more-action': MoreAction,
    'channels-edit': ChannelsEdit
  },
  data () {
    return {
      // 通过index，可以找到当前的频道对象
      activeIndex: 0,
      // 顶部搜索框内容
      searchValue: '',
      // 列表绑定值
      list: [],
      // 存储请求获取到的频道列表
      channels: [],
      // 加载成功提示文案
      successText: '',
      // 频道弹层组件 默认不显示
      showChannelsEdit: false
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  // 计算属性
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    // 加载频道列表 -----------------------------------------------------------------------
    async loadChannels () {
      try {
        const data = await getDefaultOrUserChannels()
        // 给所有的频道设置 时间戳和文章数组
        data.channels.forEach(channel => {
          channel.timestamp = null // 时间戳
          channel.articles = [] // 文章数组
          // 上拉刷新
          channel.loading = false
          channel.finished = false
          // 下拉刷新
          channel.pullLoading = false
        })
        this.channels = data.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 下拉刷新列表 -----------------------------------------------------------------------
    async onRefresh () {
      try {
        // 获取 id 时间戳 是否置顶
        const data = await getArticles({
          // 频道id ：当前id
          channelId: this.currentChannel.id,
          // 时间戳 ：最新时间
          timestamp: Date.now(),
          // 是否包含置顶1 ,0不包含
          withTop: 1
        })
        // 刷新数据unshift添加到articles中 == 把数据放到数组的最前面unshift（最新数据）
        this.currentChannel.articles.unshift(...data.results)
        // 添加成功提示
        this.successText = `加载了${data.results.length}条数据`
      } catch (error) {
        console.log(error)
      }
    },
    // 上拉刷新列表 ------------------------------------------------------------------------
    async onLoad () {
      // 发送请求
      // 获取当前频道对象 // 因设了当前频道的计算属性computed 这里不需重写
      // const currentChannel = this.channels[this.activeIndex]
      // 当前频道对象 - 时间戳
      // 当前频道对象 - 文章数组
      const data = await getArticles({
        // 频道的id
        channelId: this.currentChannel.id,
        // 时间戳
        timestamp: this.currentChannel.timestamp || Date.now(),
        // 是否包含置顶1，0不包含
        withTop: 1
      })
      // 记录文章列表最后一条的时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      // console.log(data.pre_timestamp)
      // 新刷新列表push到之前列表中
      this.currentChannel.articles.push(...data.results)
      // 刷新成功 将loading(加载中)关闭
      this.currentChannel.loading = false
      // 文章加载完毕
      // 如果某一个频道加载完毕，其他频道中的finished 也是加载完毕
      if (data.results.length === 0) {
        // 文章加载完毕 finished(加载成功)改为true
        this.currentChannel.finished = true
      }
    }
  }

}
</script>

<style lang="less" scoped>
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
