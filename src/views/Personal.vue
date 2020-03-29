<template>
  <div class="container">
    <!-- 引入自定义组件 ,showHome显示-->
    <NavigateBar title="个人中心" :showHome="true"/>
    <router-link to="edit_profile">
      <div class="header">
        <!-- 头像 -->
        <div class="avatar">
          <!-- 头像图片是来自后台的，所以加上后台地址，地址可以直接读取axios的基准路径
          好处就是以后需要修改基准路径-->
          <img :src="$axios.defaults.baseURL + userInfo.head_img" alt />
        </div>
        <!-- 姓名/日期 -->
        <div class="profile">
          <div>
            <span class="iconfont iconxingbienan" v-if="userInfo.gender===1"></span>
            <span class="iconfont iconxingbienv" v-if="userInfo.gender===0"></span>
            {{userInfo.nickname}}
          </div>
          <p>{{moment(userInfo.create_date).format('YYYY-MM-DD') }}</p>
        </div>
        <!-- 右侧的箭头图标 -->
        <span class="arrow iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <!-- 组件的调用，单双标签都可以 -->
    <!-- :key不是报错，可以不加，但是vue希望给循环指定唯一的key，所以推荐我们在循环时候都加上 -->
    <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" />

    <!-- handleClick点击退出按钮触发 -->
    <!-- click.native这个事件类型，会给Listbar这个组件最外部的div强制绑定点击事件
    不要去跟事件传递做比较-->
    <Listbar label="退出" @click.native="handleClick" />
  </div>
</template>

<script>
// 导入列表按钮栏的组件,import后面接上的变量名（变量就意味着可以随便改名字）
import Listbar from "@/components/Listbar";

import NavigateBar from "@/components/NavigateBar";

// 引入第三方的日期格式处理的工具库
import moment from "moment";

export default {
  data() {
    return {
      // 组织一个列表按钮栏的数据
      rows: [
        {
          label: "我的关注",
          tips: "关注的用户"
        },
        {
          label: "我的跟帖",
          tips: "跟帖/回复"
        },
        {
          label: "我的收藏",
          tips: "文章/视频"
        }
      ],
      // 个人的详细信息，初始值是一个对象
      userInfo: {},
      //moment是日期处理的工具库，为了在模板中可以使用，所以需要绑定data中
      moment
    };
  },
  // 注册组件，导入的子组件都必须注册才可以在模板中渲染
  components: {
    Listbar,
    NavigateBar
  },
  mounted() {
    // 从本地获取token和id
    const jsonStr = localStorage.getItem("userInfo");
    // 把字符串转成对象，userJson就是用户的信息对象
    // userJson.token和userJson.user.id这两个值是该接口需要的
    const userJson = JSON.parse(jsonStr);

    // 发送异步的请求
    this.$axios({
      // 需要的参数url地址
      url: "/user/" + userJson.user.id,
      // 添加请求头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      // 解构出用户的数据
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    handleClick() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "你确定要退出吗？"
        })
        .then(() => {
          //  点击确定时候触发的函数
          //  清除本地的用户数据
          localStorage.removeItem("userInfo");
          // 跳转到登录页，必须使用replace,因为退出不可能在返回个人中心
          this.$router.replace("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 20 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #eee;

  .avatar {
    img {
      display: block;
      width: 70 / 360 * 100vw;
      height: 70 / 360 * 100vw;
      border-radius: 50%;
      object-fit: contain;
    }
  }

  .profile {
    flex: 1;
    padding-left: 20 / 360 * 100vw;
    line-height: 1.5;
    p {
      color: #999;
    }

    .iconxingbienan {
      color: blue;
    }

    .iconxingbienv {
      color: pink;
    }
  }
}
</style>