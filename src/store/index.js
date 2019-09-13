import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录的状态
    // { token: , refresh_token: }
    // user: null
    // 项目运行时先去本地存储中获取登录状态
    user: storageTools.getItem('user'),
    // 回复组件之间的传值  回复组件的显示与隐藏
    // 三组件之间的传值  detail/index绑定事件 showReplyList[显示隐藏，放入仓库中多组件同用] => ReplyList(回复组件)接收抛出事件$event => CommentList(发布组件中有 回复 )接收 设回复点击事件 = true [效果点击回复二字 回复组件弹层显示]
    showReplyList: false,
    // 当前评论
    currentComment: null
  },
  mutations: {
    // 通过mutation改变状态
    setUser (state, user) {
      state.user = user
      // 把登录状态存储到本地存储中
      storageTools.setItem('user', user)
    },
    setShowReplyList (state, isShow) {
      state.showReplyList = isShow
    },
    setCurrentComment (state, comment) {
      state.currentComment = comment
    }
  },
  actions: {}
})
