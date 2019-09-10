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
      <van-cell
        v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title">

        <!-- 文章列表 文字 下方图片/时间/宫格  -->
        <div slot="label">
          <!-- 文章列表 图片显示 column-num自定义列数 -->
          <!-- grid 显示封面 article.cover.type   0 没有图片   1 1个图片 3 3个图片 -->
          <van-grid v-if="article.cover.type" :border="false" :column-num="3">

            <van-grid-item
              v-for="(img, index) in article.cover.images"
              :key="img + index" >
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
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  name: 'SearchResult',
  // props: ['q'],
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
      per_page: 10,
      // q 搜索页传出的item [搜索: onSearch (item) {...}]
      q: this.$route.query.q

    }
  },
  created () {
    // this.getSearchResults()
  },
  methods: {
    // 获取搜索结果 内容 ------------------------------------------
    getSearchResults () {

    },
    // 点击左箭头返回搜索页 ---------------------------------------
    onClickLeft () {
      this.$router.push('/Search')
    },
    // 上拉更新数据 ----------------------------------------------
    async onLoad () {
      try {
        console.log(this.q)

        const data = await getSearch({
          page: this.page, // 页数，不传默认为1
          perPage: this.per_page, // 每页数量
          q: this.q // 搜索关键词

        })
        this.list.push(...data.results)
        // console.log(data)
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
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  margin-top: 46px;
}
</style>
