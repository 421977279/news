<template>
  <!-- 列表按钮栏 -->
  <div class="listbar">
    <router-link to="#">
      <div>{{label}}</div>
      <div class="tips">
        {{tips}}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    // 声明子组件可以接收的属性
    // label表示左边的文字
    // tips表示右边的文字
    props:["label","tips"]
};
</script>

<style lang="less" scoped>
/**
        列表按钮栏的样式
    */
.listbar {
  padding-left: 20 / 360 * 100vw;
  height: 48 / 360 * 100vw;
  line-height: 48 / 360 * 100vw;

  a {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #eee solid;
    align-items: center;
  }

  .tips {
    color: #999;
    span {
      margin-right: 5px;
    }
  }
}
</style>