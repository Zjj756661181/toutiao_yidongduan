<template>
  <div class="more-action">
    <van-button
      :icon="article.attitude === 1 ? 'like' : 'like-o'"
      round
      :loading="false"
      plain
      hairline
      type="danger"
      @click="handleFabulous"
    >点赞</van-button>

    <van-button
      :icon="article.attitude === 0 ? 'star' : 'star-o'"
      round
      :loading="false"
      plain
      hairline
      type="danger"
      @click="handleDislike"
    >不喜欢</van-button>
  </div>
</template>

<script>
import {
  liking,
  unliking,
  dislikeArticle,
  undislikeArticle
} from '@/api/articles'

export default {
  name: 'MoreArticle',
  props: ['article'],
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
    // 不喜欢 取消不喜欢 -----------------------------
    // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
    async handleDislike () {
      // 检测是否登录 未登录 提醒 跳转登录
      if (!this.$checkLogin()) {
        return
      }

      try {
        // 检测如用户对文章的态度 === 0 当前为点赞 状态
        if (this.article.attitude === 0) {
          // 取消点赞 通过文章id
          await undislikeArticle(this.article.art_id)
          // 取消点赞后 状态随之改变
          this.article.attitude = -1
        } else {
          // 点赞
          await dislikeArticle(this.article.art_id)
          this.article.attitude = 0
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
