<template>
  <div>
    <!-- 导航nav -->
    <van-nav-bar
      class="van-nav-bar"
      title="搜索结果"
      left-text="返回"
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 文章列表 -->
      <van-cell v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title">
        <!-- 文章列表 文字 下方图片/时间/宫格  -->
        <div>
          <!-- 文章列表 图片显示 column-num自定义列数 -->
          <van-grid :border="false" :column-num="3">
            <!-- 图片区 -->
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </van-grid-item>
          </van-grid>
          <!-- 时间行 -->
          <p>
            <span>11</span>
            <span>22</span>
            <span>33</span>
          </p>
          <!-- 评论 点赞 分享 -->
          <van-grid :border="false" :column-num="3">
            <van-grid-item>
              <span>11</span>
            </van-grid-item>
            <van-grid-item>
              <span>11</span>
            </van-grid-item>
            <van-grid-item>
              <span>11</span>
            </van-grid-item>
          </van-grid>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script src="./node_modules/lodash/lodash.js"></script>
<script>
import { getSearch } from '@/api/search'

export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      // 列表
      list: [],
      // 加载中 默认不显示
      loading: false,
      // 加载完成 默认不显示
      finished: false,
      // 页数，不传默认为1
      page: 1,
      // 每页数量
      per_page: 10
    }
  },
  created () {
    this.getSearchResults()
  },
  methods: {
    // 获取搜索结果 内容 -----------------
    async getSearchResults () {
      try {
        const data = await getSearch({
          page: this.page, // 页数，不传默认为1
          perPage: this.per_page, // 每页数量
          q: this.q // 搜索关键词, // 页数，不传默认为1
        })
        this.list.push(...data.results)
        // console.log(data.results)
        this.page++
        // 加载结束
        this.loading = false
        // 判断是否加载完毕
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('获取搜索结果数据失败')
      }
    },
    // 点击左箭头返回搜索页 --------------
    onClickLeft () {
      this.$router.push('/Search')
    },
    // 上拉更新数据 ---------------------
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
.van-list {
  margin-top: 46px;
}
</style>
