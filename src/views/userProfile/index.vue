<template>
  <div>
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="showUploadFile=true">
        <div slot="default">
          <img width="30" height="30" :src="userProfile.photo" alt="">
        </div>
      </van-cell>
      <van-cell title="昵称" is-link :value="userProfile.name" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link :value="userProfile.gender ? '女' : '男'" />
      <van-cell title="生日" is-link :value="userProfile.birthday"/>
    </van-cell-group>

    <!-- 上传 头像图片 组件 -->
    <upload-file v-model="showUploadFile" :UploadSuccess="handleSuccess"></upload-file>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UploadFile from './component/UploadFile'

export default {
  name: 'userProfile',
  data () {
    return {
      // 储存个人资料列表
      userProfile: {},
      // 控制上传组件显示隐藏
      showUploadFile: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  components: {
    UploadFile
  },
  methods: {
    // 获取用户个人资料 ----------------------------
    async loadUserProfile () {
      try {
        const data = await getUserProfile()
        // console.log(data)
        this.userProfile = data
      } catch (error) {
        this.$toast.fail('获取用户个人资料失败')
      }
    },
    // 头像上传成功 --------------------------------
    handleSuccess (photo) {
      // 子组件传$emit事件
      this.userProfile.photo = photo
    }
  }
}
</script>

<style>

</style>
