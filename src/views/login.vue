<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field v-model="user.mobile" left-icon="phone-o" placeholder="请输入手机号码" />
      <van-field v-model="user.code" left-icon="star-o" placeholder="请输入验证码">
        <van-button slot="button" type="default" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button class="btn" type="info" @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 点击登录事件
    async handleLogin () {
      try {
        const data = await login(this.user)
        // 存储登录的状态
        // 跳转首页
        this.$router.push('/')
        // 成功提示
        this.$toast.success('登录成功')
        console.log(data)
      } catch (err) {
        // 失败提示
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>
