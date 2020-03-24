<template>
  <div id="app">
    <!-- 匹配的组件的坑 -->
    <router-view/>
  </div>
</template>

<style lang="less">
// css原生的写法
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");

// 公共的样式
*{
  margin: 0;
  padding: 0;
}

// inherit 继承
a{
  text-decoration: none;
  color: inherit;
}

a:hover{
  color:inherit;
}

ul,li,ol{
  list-style: none;
}

i,em{
  font-style: normal;
}
</style>
