<template>
  <div class="container">
    <!-- 返回上一页按钮 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- login -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 表单 -->
    <!-- <div class="form">
      <div class="form-item">
        <input placeholder="手机号码" v-model="form.username"/>
      </div>
      <div class="form-item">
        <input type="password" placeholder="请输入密码" v-model="form.password"/>
      </div>
      <div class="form-item">
        <button @click="handleClick">登录</button>
      </div>
    </div>-->

    <!-- 使用vant的表单 -->
    <van-form @submit="onSubmit" class="form">
      <!-- rules是表单字段的规则，required是必选字段 -->
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!-- 昵称的输入框 -->
      <van-field
        v-model="form.nickname"
        type="text"
        name="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <!-- 密码输入框，和上面的属性是一样的 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <!-- 如果这个按钮是van-form组件内部，
        并且按钮的native-type="submit",说明点击这个按钮就会触发submit事件-->
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>

    <router-link to="/login">
      <van-button round block class="link-login">登录</van-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存表单数据
      form: {
        username: "",
        nickname: "",
        password: ""
      }
    };
  },
  methods: {
    // handleClick() {
    //   // 调用axios发起异步请求，类似$.ajax()(类似不代表一样)
    //   this.$axios({
    //     // 接口地址
    //     url: "http://127.0.0.1:3000/login",
    //     // 声明请求的方式为post请求
    //     method: "POST",
    //     // 参数
    //     data: this.form
    //     // .then方法里面的函数就是成功的回调函数
    //   }).then(res => {
    //     console.log(res);
    //     // 获取到返回的信息
    //     const { message } = res.data;
    //     // 使用vant的弹窗提示
    //     this.$toast.success(message);
    //   });
    // }

    // 提交表单时候触发的事件，结果需要校验
    // value是表单的返回值，这里的values我们用不上，
    onSubmit(values) {
      this.$axios({
        // 接口地址
        url: "/register",
        // 声明请求的方式为post请求
        method: "POST",
        // 参数
        data: this.form
        // .then方法里面的函数就是成功的回调函数
      }).then(res => {
        console.log(res);
        // 获取到返回的信息
        const { message } = res.data;
        // 使用vant的弹窗提示
        this.$toast.success(message);
      });

      // console.log("submit", this.form);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20 /360 * 100vw;
}

.back-btn {
  font-size: 27 /360 * 100vw;
  line-height: 0;
}

.logo {
  text-align: center;
  margin-top: 20/360 * 100vw;
}

.logo span {
  font-size: 126/360 * 100vw;
  color: #cc3300;
}

.form-item {
  margin-top: 20 /360 * 100vw;
}

.form-item input {
  width: 100%;
  height: 44 /360 * 100vw;
  box-sizing: border-box;
  line-height: 44 /360 * 100vw;
  background: none;
  border: none;
  border-bottom: 1px #999 solid;
  outline: none; //输入框点击时候没有高亮状态
  font-size: 16px; //文字大小尽量用像素
}

.form-item button {
  width: 100%;
  height: 48 /360 * 100vw;
  background-color: #cc3300;
  color: #fff;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 16px;
}

.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20 / 360 * 100vw;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }

  .van-button--info {
    background-color: #cc3300;
    margin-top: 50 /360 * 100vw;
    border: 1px solid #cc3300;
  }
}

.link-login {
  margin-top: 20 /360 * 100vw;
}
</style>