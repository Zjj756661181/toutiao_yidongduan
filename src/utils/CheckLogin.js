// 插件就是一个对象，具有install(Vue, options)

export default {
  install (Vue) {
    // 给Vue的实例添加方法
    Vue.prototype.$checkLogin = function () {
      // this 是Vue的实例  this.$checkLogin()
      // 判断是否登录
      if (!this.$store.state.user) {
        // 如果没有登录，提示用户是否要登录
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否要跳转到登录页面'
        }).then(() => {
          // onconfirm 点击确认按钮执行
          // 点击确认按钮，跳转到登录页面
          this.$router.push('/login', {
            query: {
              // params 动态路由参数
              // query 查询字符串
              // console.log(this.$route) 查找fullPath
              redirect: this.$route.fullPath
            }
          })
        }).catch(() => {
          // on cancel 点击取消按钮执行
        })
        return false
      }
      return true
    }
  }
}
