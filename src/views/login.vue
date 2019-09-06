<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <!-- 使用VeeValidate
        1. 通过v-validate 设置验证的规则
        2. 设置文本框的name属性
        3. 展示验证错误信息
      -->
      <van-field
        v-validate="'required|digits:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
        v-model="user.mobile"
        clearable
        left-icon="phone-o"
        placeholder="请输入手机号码"
      />
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        v-model="user.code"
        left-icon="star-o"
        placeholder="请输入验证码"
      >
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
import { mapMutations } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  created () {
    // 字段特定的自定义消息 ---------------------
    // 配置VeeValidate的自定义验证信息
    const dict = {
      custom: {
        // 验证文本框
        mobile: {
          // 验证规则失败之后的提示信息
          required: '请输入手机号码',
          digits: '手机号码必须是11位数字'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位数字'
        }
      }
    }
    // or use the instance method => 或者使用实例方法
    this.$validator.localize('custom', dict)
    // ------------------------------------------
  },
  methods: {
    ...mapMutations(['setUser']),
    // 点击登录事件
    async handleLogin () {
      try {
        // 表单验证
        // this.$validator.validate().then(async valid => {
        // validate() 返回的是promise对象，所以可以使用await调用 [优化validate()调用]
        const valid = await this.$validator.validate()
        // 验证失败
        if (!valid) {
          // do stuff if not valid.
          return
        }
        // 验证成功
        const data = await login(this.user)
        // 存储登录的状态
        // 1.vuex
        // this.$store.commit('setUser', data)
        // 2.本地存储
        // 以上 1 - 2 两件事都是在store中完成
        this.setUser(data)
        // 跳转首页
        this.$router.push('/')
        // 成功提示
        this.$toast.success('登录成功')
        // })
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
