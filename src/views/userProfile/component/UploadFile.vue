<template>
  <div>
    <van-dialog
        :value="value"
        @input="$emit('input', $event)"
        :showConfirmButton="false"
        closeOnClickOverlay
    >
        <van-cell-group>
            <van-cell title="从相册选择图片" @click="handleSelectFile"/>
            <input ref="file" type="file" style="display:none">
            <van-cell title="拍照" />
            <van-cell title="取消" @click="$emit('input', false)" />
        </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { UploadPhoto } from '@/api/user'
Vue.use(ImagePreview)

export default {
  name: 'UploadFile',
  props: ['value'],
  methods: {
    // 本地上传图片 --------------------------------------
    handleSelectFile () {
      // 点击 从相册选择图片 触发input输入框file => 弹出本地选择图片窗口
      this.$refs.file.click()
      // 选择本地图片  触发onchange事件
      this.$refs.file.onchange = (e) => {
        // 如果没有选择文件 直接返回
        if (e.target.files.length === 0) {
          return
        }
        // 图片在内存中可以访问的路径
        const url = URL.createObjectURL(e.target.files[0])
        // const url = URL.createObjectURL(e.target.files[0])
        // console.log(url)
        // 在点击预览图片之前要关闭掉上传图片遮罩层
        this.$emit('input', false)
        // 图片预览
        ImagePreview({
          images: [
            url
          ],
          // 不显示页码
          showIndex: false,
          onClose: this.handleUploadPhoto
        })
      }
    },
    // 上传头像
    handleUploadPhoto () {
      this.$dialog.confirm({
        message: '是否确认该图片作为头像'
      }).then(async () => {
        try {
          // 加载提示
          this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '正在上传...'
          })

          const data = await UploadPhoto('photo', this.$refs.file.files[0])
          // 更改当前的头像
          console.log(data)
          // 通知父组件图片上传成功
          this.$emit('UploadSuccess', data.photo)
          // 成功提示
          this.$toast.success('头像上传成功')
        } catch (error) {
          this.$toast.fail('头像上传成功')
        }

        // 关闭加载提示
        this.$toast.clear()
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__title {
  text-align: center;
}
</style>
