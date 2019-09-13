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
      <more-article :article="article"></more-article>
      <!-- 评论列表 -->
      <comment-list :isArticle="true" :id="article.art_id.toString()"></comment-list>
      <!-- 发布评论组件 -->
      <send-comment :isArticle="true" :target="article.art_id.toString()"></send-comment>
      <!-- 回复评论 弹层 组件 -->
      <reply-list v-model="showReplyList" :artId="id"></reply-list>
    </div>
  </div>
</template>

<script>
// 获取当前点击文章详情
import { getArticleDetail } from '@/api/articles'
// 作者信息 组件
import AuthorInfo from './component/authorInfo'
// 点赞和取消 组件
import MoreArticle from './component/MoreArticle'
// 评论列表 组件
import CommentList from './component/CommentList'
// 发布评论 组件
import SendComment from './component/SendComment'
// 评论弹层 组件
import ReplyList from './component/ReplyList'
import { mapState } from 'vuex'
// import { mapMutations } from 'vuex'
export default {
  name: 'detailIndex',
  // 文章的id  SendComment需要[ReplyList中]
  props: ['id'],
  data () {
    return {
      // 文章详情 未点击是是没有的 默认空
      article: null
    }
  },
  components: {
    // 作者信息 组件
    AuthorInfo,
    // 点赞和取消 组件
    MoreArticle,
    // 评论列表 组件
    CommentList,
    // 发布评论 组件
    SendComment,
    // 评论弹层 组件
    ReplyList
  },
  created () {
    // 渲染当前文章详情
    this.getArticles()
  },
  computed: {
    ...mapState(['showReplyList'])
    // ...mapMutations(['setShowReplyList'])
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
