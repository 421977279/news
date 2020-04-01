<template>
  <div>
    <div class="container">
      <!-- 头部 -->
      <NavigateBar :title="title" :showHome="showHome" />
      <!-- 关注列表 -->
      <div class="focusList" v-for="(item,index) in myFocus" :key="index">
        <div class="focus_content">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
          <div class="focus_nickname">
            <p>{{item.nickname}}</p>
            <!-- <span>{{item.create_date}}</span> -->
            <span>{{moment(item.create_date).format('YYYY-MM-DD hh:mm:ss')}}</span>
          </div>
        </div>
        <div class="if_focus">
          <p @click="unfollow(item.id,index)">取消关注</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigateBar from "@/components/NavigateBar";

import moment from "moment";

export default {
  data() {
    return {
      title: "我的关注",
      showHome: false,
      // 我的关注列表
      myFocus: [],
      // 挂载到data上
      moment,
      //本地的用户数据 token
      userJson: {}
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userJson);
    console.log(userJson.token);
    // 将本地的用户数据保存到data上
    this.userJson = userJson;
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      console.log(data);
      this.myFocus = data;
    });
  },
  methods: {
    unfollow(id, index) {
      console.log(id, index);
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "你确定要狠心删除吗？"
        })
        .then(() => {
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.userJson.token
            }
          }).then(res => {
            // console.log(res);
            this.$toast.success(res.data.message);
            // 重新渲染页面
            this.myFocus.splice(index, 1);
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  .focusList {
    padding: 20 / 360 * 100vw 20 / 360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dcdcdc;
    .focus_content {
      display: flex;
      img {
        width: 40 / 360 * 100vw;
        height: 40 / 360 * 100vw;
        border-radius: 50%;
        object-fit: cover; //防止图片变形
      }
      .focus_nickname {
        margin-left: 20 / 360 * 100vw;
        font-size: 16px;
        span {
          font-size: 14px;
          color: #948395;
        }
      }
    }

    .if_focus {
      width: 70 / 360 * 100vw;
      height: 30 / 360 * 100vw;
      line-height: 30 / 360 * 100vw;
      text-align: center;
      background-color: #e1e1e1;
      font-size: 12px;
      border-radius: 15 / 360 * 100vw;
    }
  }
}
</style>