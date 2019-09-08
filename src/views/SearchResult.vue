<template>
  <div>
    <!-- 导航nav -->
    <van-nav-bar
      class="van-nav-bar"
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 文章列表 -->
      <van-cell v-for="item in list" :key="item" :title="item">
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
      finished: false
    }
  },
  created () {
    this.getSearchResults()
  },
  methods: {
    // 获取搜索结果 内容 -----------------
    async getSearchResults () {
      try {
        const data = await getSearch(this.item)
        this.list = data.results
        console.log(data.results)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击左箭头返回搜索页 --------------
    onClickLeft () {},
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
</style>
