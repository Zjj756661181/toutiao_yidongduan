<template>
  <div>
    <!-- 不能使用 v-model="value"
    value 是通过props传递，是单项的
    当dialog组件中input事件触发，说明要去更改value
    @input="handleInput(i)" -->
    <van-dialog :value="value" @input="$emit('input',$event)" :showConfirmButton="false" closeOnClickOverlay>
      <!-- 弹层组件 不感兴趣 -->
      <van-cell-group v-show="!showReports">
        <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')"/>
        <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports=true" />
        <van-cell title="拉黑作者" icon="location-o" @click="handle('blacklist')"/>
      </van-cell-group>
      <!-- 举报文章 -->
      <van-cell-group v-show="showReports">
        <!-- 回退不感兴趣弹框箭头 -->
        <van-cell icon="arrow-left" @click="showReports=false" />
        <!-- 举报作者列表 -->
        <van-cell
        v-for="item in reqortList"
        :key="item.type"
        :title="item.title"
        @click="handle('report', item.type)"/>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/articles'
import { blacklists } from '@/api/user'

export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件给子组件传递的对象
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // show: true,
      showReports: false,
      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      reqortList: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
    }
  },
  methods: {
    // handle 方法 --------------------------------
    // 点击cell的时候都执行这个方法 通过type判定具体的执行操作
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          // 不感兴趣
          this.dislike()
          break
        case 'blacklist':
          // 拉黑作者
          this.blacklistUser()
          break
        case 'report':
          // 拉黑作者
          this.report(reportType)
          break
      }
    },
    // 不感兴趣 ------------------------------------
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        // 操作成功提示
        this.$toast.success('操作成功')
      } catch (err) {
        // 操作失败提示
        this.$toast.fail('操作失败')
      }
    },
    // 拉黑作者 ------------------------------------
    async blacklistUser () {
      try {
        await blacklists(this.article.aut_id)
        // 通知父组件，拉黑成功
        //    隐藏对话框，删除数据
        this.$emit('handleSuccess')
        // 操作成功提示
        this.$toast.success('操作成功')
      } catch (err) {
        // 操作失败提示
        this.$toast.fail('操作失败')
      }
    },
    // 举报作者 -----------------------------------
    async report (reportType) {
      try {
        await reportArticle({
          target: this.article.art_id,
          type: reportType
        })
        // 告诉父组件隐藏对话框
        this.$emit('input', false)
        // 成功提示
        this.$toast.success('操作成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>
</style>
