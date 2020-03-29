<template>
      <!-- 头部 -->
    <div class="navigate-bar">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>{{title}}</strong>

      <!-- 如果showHome是true就显示 -->
      <span class="iconfont iconshouye" 
      @click="$router.push('/')" 
      v-if="showHome"></span>

    <!-- 如果showHome是false就显示下面这个span -->
    <!-- v-else指令是必须要接着v-if后面来使用 -->
      <span v-else class="iconfont iconshouye" style="opacity:0"></span>  
    </div>
</template>

<script>
export default {
    // 组件传递，展示的文字和是否展示首页的图标
    // showHome是布尔值，如果传入的ture,就显示，如果是false,就因此
    props:['title','showHome']
}
</script>

<style lang="less" scoped>
.navigate-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48 / 360 * 100vw;
  padding: 0 20 / 360 * 100vw;
  border-bottom: 1px #eee solid;

  .iconshouye {
    font-size: 20px;
  }
}
</style>