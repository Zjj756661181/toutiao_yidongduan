<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="handleInput"
      clearable
      background="#3e9df8"
    />

    <!-- 搜索提示 -->
    <van-cell-group v-show="value">
      <van-cell
        @click="onSearch(item)"
        v-for="item in suggestionList"
        :key="item"
        :title="item"
        icon="search" />
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div  v-show="isEdit" style="display: inline-block">
          <span>全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
        </div>
        <van-icon v-show="!isEdit" @click="isEdit=true" name="delete" size="18px" />
      </van-cell>

       <van-cell
        v-for="(item, index) in histories"
        :key="item"
        :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon v-show="isEdit" name="close" @click="handleDelete(index)" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { userHistories } from '@/api/user'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'

export default {
  name: 'Search',
  data () {
    return {
      value: '',
      // 存储搜索建议
      suggestionList: [],
      // 编辑模式
      isEdit: false,
      // 历史记录
      histories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 加载历史记录
    if (this.user) {
      // 从服务器获取数据
      return
    }
    // 没有登录，从本地存储获取数据
    this.histoies = storageTools.getItem('history') || []
  },
  methods: {
    // 搜索
    async onSearch (item) {
      // 判断histories中是否已经存在item
      if (this.histories.includes(item)) {
        return
      }
      // 记录搜索历史
      this.histories.push(item)
      // 判定用户登录
      if (this.user) {
        // 发送请求
        const data = await userHistories()
        // 赋值
        this.histories = data
          .return
      }
      // 没有登录就把数据存储到本地
      storageTools.setItem('history', this.histories)
    },
    // 文本输入获取搜索提示 ---------------------
    onCancel () {},
    // 在文本框输入的过程中获取搜索提示
    async handleInput () {
      // 判断是否为空
      if (this.value.length === 0) {
        return
      }
      try {
        // 发送请求
        const data = await getSuggestion(this.value)
        // 成功 赋值
        this.suggestionList = data.options
      } catch (error) {
        console.log(error)
      }
    },
    // 点击历史记录的删除按钮 --------------------
    handleDelete (index) {
      // 删除当前
      this.histories.splice(index, 1)
      // 数据变动重新存储
      storageTools.setItem('history', this.histories)
    }
  }
}
</script>

<style>
</style>
