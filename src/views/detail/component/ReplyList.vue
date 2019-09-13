<template>
  <van-popup
    :value="value"
    @input="$store.commit('setShowReplyList',$event)"
    position="bottom"
    :style="{ height: '80%' }"
    v-if="currentComment"
  >
    <!-- 评论区 title -->
    <van-nav-bar :title="currentComment.reply_count + '条评论'" />

    <!-- 待评论区 -->
    <van-cell>
      <div slot="icon">
        <img class="avatar" :src="currentComment.aut_photo" alt />
      </div>
      <div slot="title">
        <span>{{ currentComment.aut_name }}</span>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{ currentComment.content }}</p>
        <p>
          <span>{{ currentComment.pubdate | fmtDate }}</span>
          &nbsp;
          <span>回复{{ currentComment.reply_count }}</span>
        </p>
      </div>
    </van-cell>

    <!-- 评论的回复列表 -->
    <h3>回复评论</h3>
    <comment-list :isArticle="false" :id="currentComment.com_id.toString()"></comment-list>

    <!-- 发布组件 -->
    <send-comment :isArticle="false" :target="currentComment.com_id.toString()" :artId="artId"></send-comment>

  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
import CommentList from './CommentList'
import SendComment from './SendComment'
import eventHub from '@/utils/eventHub'

export default {
  name: 'ReplyList',
  props: ['value', 'artId'],
  computed: {
    ...mapState(['currentComment'])
  },
  components: {
    CommentList,
    SendComment
  },
  created () {
    eventHub.$on('sendSuccess', () => {
      // 接收SendComment传出的事件 在回复 后边数量上相加
      this.currentComment.reply_count++
    })
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
</style>
