<template>
  <div id="app">
    <!-- 使用keep-alive缓存动态切换的组件 -->
    <!--
      include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
      exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
      max - 数字。最多可以缓存多少组件实例。
     -->
     <!-- <keep-alive exclude="Detail"> -->
       <router-view/>
      <!-- </keep-alive> -->

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
