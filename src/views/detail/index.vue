<template>
   <div v-if="article">
    <!-- 头部导航 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      fixed
      @click-left="$router.back()"
    />
    <div class="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{ article.title }}</h2>
      <!-- 作者信息 -->
      <author-info :article="article"></author-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>
      <!-- 点赞和取消 -->
      <more-article></more-article>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/articles'
import AuthorInfo from './component/authorInfo'
import MoreArticle from './component/MoreArticle'

export default {
  name: 'detailIndex',
  props: ['id'],
  data () {
    return {
      // 文章详情 未点击是是没有的 默认空
      article: null
    }
  },
  components: {
    AuthorInfo,
    MoreArticle
  },
  created () {
    // 渲染当前文章详情
    this.getArticles()
  },
  methods: {
    // 获取当前点击文章详情 ---------------------------------
    async getArticles () {
      try {
        // 通过id 获取文章详情
        const data = await getArticleDetail(this.id)
        // 赋值data中 定义 article[文章全部详情 so 是 = data]
        this.article = data
      } catch (error) {
        this.$toast.fail('获取文章数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 92px;
  padding: 0px 20px;
  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
}
</style>
