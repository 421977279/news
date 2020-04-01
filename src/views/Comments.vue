<template>
  <div class="container">
    <NavigateBar :title="title" :showHome="showHome" />
    <div class="myComments" v-for="(item,index) in comments" :key="index">
      <!-- <div class="data">{{item.create_date}}</div> -->
      <div class="data">{{moment(item.create_date).format('YYYY-MM-DD hh:mm')}}</div>
      <!-- 有回复的评论需要展示的，就是我回复了谁 -->
      <div class="main" v-if="item.parent">
        <div class="main-user">回复：{{item.parent.user.nickname}}</div>
        <div class="main-content">{{item.parent.content}}</div>
      </div>
      <div class="myComments_content">{{item.content}}</div>

      <router-link to="#" class="post_source">
        原文：{{item.post.title}}
        <span class="iconfont iconjiantou1"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavigateBar from "@/components/NavigateBar";
import moment from "moment";

export default {
  data() {
    return {
      title: "我的跟帖",
      showHome: false,
      userJson: {},
      comments: [],
      moment
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      console.log(data);
      this.comments = data;
    });
  }
};
</script>

<style scoped lang="less">
.myComments {
  padding: 20 / 360 * 100vw;
  color: #939393;
  border-bottom: 1px solid #d7d7d7;
  .data {
    margin-bottom: 6 / 360 * 100vw;
    font-size: 14px;
  }
  .main {
    background-color: #e4e4e4;
    padding: 20 / 360 * 100vw 14 / 360 * 100vw;
    .main-user {
      font-size: 14px;
      margin-bottom: 10 / 360 * 100vw;
    }
    .main-content {
      font-size: 15px;
    }
  }
  .myComments_content {
    color: #000;
    padding: 10 / 360 * 100vw 0;
  }
  .post_source {
    display: flex;
    align-items: center;
    position: relative;
    // padding-right: 130px;
		font-size: 14px;
		// 文本超过出现省略号一定是块元素才有用
    text-overflow: ellipsis;   //文本溢出显示省略符号
    white-space: nowrap;       //文本不会换行
    overflow: hidden;
    span {
      position: absolute;
      right: 0;
    }
  }
}
</style>