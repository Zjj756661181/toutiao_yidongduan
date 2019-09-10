<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{ article.aut_name }}</p>
        <p>{{ article.pubdate | fmtDate }}</p>
      </div>
    </div>
    <div>
      <van-button type="danger" :loading="false" @click="handleFollowUser">{{ article.is_followed ? '已' : '+'  }}关注</van-button>
    </div>
  </div>
</template>

<script>
import { FollowUser, unFollowUser } from '@/api/user'

export default {
  name: 'authorInfo',
  props: ['article'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // 点击关注按钮 切换已关注 和 +关注 -------------------------
    async handleFollowUser () {
      this.loading = true
      // 检测是否登录 未登录提示跳转登录页  登录后跳回本页面
      // ......... 待完成
      try {
        // 检测是否已关注 已关注 => 点击取消
        if (this.article.is_followed) {
          await unFollowUser(this.article.aut_id.toString())
          // 手动切换关注按钮
          this.article.is_followed = false
        } else {
          // +关注 => 点击关注
          await FollowUser(this.article.aut_id.toString())
          // 手动切换按钮
          this.article.is_followed = true
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
}
</style>
