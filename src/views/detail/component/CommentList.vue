<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad">
    <van-cell v-for="comment in list" :key="comment.com_id.toString()">
      <div slot="icon">
        <img class="avatar" :src="comment.aut_photo" alt />
      </div>
      <div slot="title">
        <span>{{ comment.aut_name }}</span>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{ comment.content }}</p>
        <p>
          <span>{{ comment.pubdate | fmtDate }}</span>
          &nbsp;
          <span @click="handleShowReplyList(comment)">回复{{ comment.reply_count }}</span>
        </p>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'

export default {
  name: 'CommentList',
  // isArticle 是否是文章
  // id  如果获取文章的评论，id文章的id，如果获取评论的评论 id是评论的id
  props: ['isArticle', 'id'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: null,
      // 每页获取多少条数据
      limit: 10
    }
  },
  methods: {
    // 获取评论 列表 ------------------------
    async onLoad () {
      try {
        const data = await getComment({
          // 是否是文章
          isArticle: this.isArticle,
          // 源id，文章id或评论id
          source: this.id,
          // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          offset: this.offset,
          // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
          limit: this.limit
        })
        // 当前获取的最后一条数据的id存储
        this.offset = data.last_id
        // 新获取的数据push进list
        this.list.push(...data.results)
        // 加载状态关闭
        this.loading = false
        // 检测是否加载完成  => 加载完成开启
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('加载评论失败')
      }
    },
    // 点击回复 调出回复弹层组件 -------------
    handleShowReplyList (comment) {
      this.$store.commit('setShowReplyList', true)
      // console.log('123')
      this.$store.commit('setCurrentComment', comment)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}
.van-list {
  margin-bottom: 64px;
}
</style>
