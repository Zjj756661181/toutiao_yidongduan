<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed title="首页" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!--单击按钮 弹出 频道弹层  -->
      <van-icon slot="nav-right" name="wap-nav" @click="showChannelsEdit=true"/>
      <!-- 频道标签 == 遍历循环 tab 标签页，显示频道列表 -->
      <van-tab type="line" v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="channel.pullLoading"
          @refresh="onRefresh"
          :success-text="successText"
        >
          <!-- 上拉刷新事件 -->
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 文章列表,不同的标签页下有不同的列表 -->
            <van-cell v-for="article in currentChannel.articles" :key="article.art_id.toString()" :title="article.title">
              <div slot="label">
                <!-- grid 显示封面  article.cover.type   0 没有图片   1 1个图片 3 3个图片  -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="img + index">
                     <van-image lazy-load height="80" :src="img" >
                      <!-- 图片的加载提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 自定义加载失败提示 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{ article.aut_name }}</span>&nbsp;
                  <span>{{ article.comm_count }}评论</span>&nbsp;
                  <span>{{ article.pubdate | fmtDate }}</span>&nbsp;
                  <!-- 点击x按钮，记录当前的文章对象 -->
                  <van-icon name="cross" class="close" @click="handleAction(article)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层组件 - 不感兴趣 -->
    <more-action v-model="showMoreAction" v-if="currentArticle" :article="currentArticle"></more-action>
    <!-- 举报弹出层 -->
    <channels-edit :active="activeIndex" :channels="channels" v-model="showChannelEdit"></channels-edit>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticles } from '@/api/articles'
// 加载moreaction组件
import MoreAction from '../components/MoreAction'
// 导入频道管理的组件
import ChannelsEdit from '../components/ChannelsEdit'
import { getItem, setItem } from '@/utils/localStorage'
// Loading 加载 需引入
import Vue from 'vue'
import { Lazyload } from 'vant'

// options 为可选参数，无则不传
Vue.use(Lazyload)

export default {
  data () {
    return {
      // 设置tabs默认索引,通过索引找当前频道
      activeIndex: 0,
      // 列表
      list: [],
      // // 上拉显示加载 默认不显示
      // loading: false,
      // // 上拉加载完成显示加载成功 默认不显示
      // finished: false,
      // 频道列表
      channels: [],
      // 下拉刷新成功后提示
      successText: '',
      // 弹层隐藏
      showMoreAction: false,
      // 点击x的时候，记录的当前文章对象
      currentArticle: null,
      // 控制频道管理的弹出层显示隐藏
      showChannelEdit: false
    }
  },
  created () {
    this.getChannelsList()
  },
  components: {
    MoreAction,
    ChannelsEdit
  },
  computed: {
    // 返回当前频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    // 获取频道列表 ---------------------------------------------
    async getChannelsList () {
      try {
        let channels = []
        // 1.如果用户登录，发送请求，获取数据
        if (this.$store.state.user) {
          const data = await getUserChannels()
          channels = data.channles
        } else {
          // 2.如果用户没有登录，则从本地储存中找数据，没有数据在发送请求
          // 如果本地存储中没有值，获取的是null
          channels = getItem('channels')
          // 存储到本地存储中
          setItem('channels', channels)
        }
        // 给所有的列表设置时间戳(每次上拉 | 下拉需要) 文章数组(上拉 | 下拉更新后需要push进之前的列表)
        // forEach 遍历给每个频道都加入
        channels.forEach(channel => {
          // 当前时间戳 设空(第一次获取没有当前时间戳)
          channel.timestamp = null
          // 文章列表
          channel.articles = []
          // 上拉加载中 -- 默认不显示
          channel.loading = false
          // 上拉加载完成 -- 默认不显示
          channel.finished = false
          // 下拉刷新 -- 默认不显示
          channel.pullLoading = false
        })
        // 将获取的频道赋值给 data()中绑定的channels[循环列表]
        this.channels = channels
      } catch (error) {
        console.log(error)
      }
    },
    // 下拉刷新 -------------------------------------------------
    async onRefresh () {
      // 下拉时获取 id 时间戳 是否置顶[同上拉]
      try {
        const data = await getArticles({
          // 获取参数 id 时间戳 是否置顶 === 赋值
          // id : 计算属性[获取上拉时当前属于哪个频道的id]
          channelId: this.currentChannel.id,
          // 时间戳 : 前一页历史数据 如第一次获取列表赋值最新时间
          timestamp: Date.now(),
          // // 是否包含置顶 - 1置顶 ，0不包含置顶
          withTop: 1
        })
        // 下拉刷新成功后不显示加载
        this.channel.pullLoading = false
        this.channel.loading = false
        // 刷新成功后unshift添加到列表上方
        this.currentChannel.articles.unshift(...data.results)
        // 添加成功提示
        this.successText = `加载了${data.results.length}条数据`
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
      this.currentChannel.loading = false
      // 文章加载完毕
      // 如果某一个频道加载完毕，其他频道中的finished 也是加载完毕
      if (data.results.length === 0) {
        // 文章加载完毕 finished(加载成功)改为true
        this.currentChannel.finished = true
      }
    },
    // 点击 x 时 显示不感兴趣弹框 获取当前文章内容
    handleAction (article) {
      this.showMoreAction = true
      this.currentArticle = article
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
.nav-btn {
  position: fixed;
  right: 10px;
  line-height: 44px;
  background-color: #fff;
  opacity: 0.8;
  font-size: 22px;
}
</style>
