<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content" />
    </div>
    <div class="more-wrap">
      <van-icon v-if="!isArticle" name="star-o"></van-icon>
      <van-button @click="handleSend" size="small">发布</van-button>
    </div>
  </div>
</template>

<script>
import { sendComment } from '@/api/comment'
import eventHub from '@/utils/eventHub'

export default {
  name: 'SendComment',
  props: ['isArticle', 'target', 'artId'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    // 点击发布 ---------------------------
    async handleSend () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      if (this.content.length === 0) {
        this.$toast('请输入评论内容')
        return
      }
      // 发布评论const data =
      try {
        const data = await sendComment({
          target: this.target,
          content: this.content
        })
        // 触发eventHub 发出事$emit 发布成功
        eventHub.$emit('sendSuccess', data.new_obj)
        // console.log(data)
        // data.new_obj
        this.content = ''
      } catch (error) {
        this.$toast.fail('发送失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 15px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
