// 从vue导入Vue构造函数
import Vue from 'vue'
// 从App.vue导入App组件（以.vue结尾的文件都是组件）
import App from './App.vue'
// 从/router导入路由对象
import router from './router'
// 引入vant ui组件库
import Vant from 'vant';
// 导入axios
import axios from "axios";

// 绑定到原型，加上之后就可以在组件中通过this.$axios来调动请求方法
Vue.prototype.$axios = axios;

// 注册vant插件 （vue.use都是用来注册插件）
Vue.use(Vant);


// 上线环境是否提示信息（忽略）
Vue.config.productionTip = false

// 创建一个根实例
// .$mount('#app') 相当于el配置，指定id为app的元素作为模板
new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件（写法是固定的）
  render: h => h(App)
}).$mount('#app')
