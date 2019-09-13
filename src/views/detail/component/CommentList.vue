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
        <van-button @click="handleFabulous()" icon="like-o" size="mini" plain>赞</van-button>
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
import { liking, unliking } from '@/api/articles'
import eventHub from '@/utils/eventHub'

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
  created () {
    // 注册评论列表 评论成功事件
    eventHub.$on('sendSuccess', (obj) => {
      //
      if (this.isArticle === obj.isArticle) {
        this.list.unshift(obj.comment)
      }
    })
  },
  methods: {
    // 点赞 取消点赞 -----------------------------------
    // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
    async handleFabulous () {
      // 检测是否登录 未登录 提醒 跳转登录
      if (!this.$checkLogin()) {
        return
      }

      try {
        // 检测如用户对文章的态度 === 1 当前为点赞 状态
        if (this.article.attitude === 1) {
          // 取消点赞 通过文章id
          await unliking(this.article.art_id)
          // 取消点赞后 状态随之改变
          this.article.attitude = -1
        } else {
          // 点赞
          await liking(this.article.art_id)
          this.article.attitude = 1
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
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
