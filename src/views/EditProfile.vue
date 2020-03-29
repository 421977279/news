<template>
  <div>
    <!-- 引入自定义组件 -->
    <NavigateBar title="编辑资料" />

    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />

      <!-- 添加上传组件 -->
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>

    <!-- 按钮列表 -->
    <!-- 这里的show=true相当于this.show=true -->
    <Listbar label="昵称" 
    :tips="userInfo.nickname" 
    @click.native="show=true"/>

    <!-- 给编辑按钮添加弹出窗口 -->
    <van-dialog v-model="show" 
    title="修改用户名" 
    show-cancel-button
    @confirm="handleChangeNickname">
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>

    <!-- 编辑密码的按钮 -->
    <Listbar label="密码" tips="******" @click.native="showPassword=true"/>

    <!-- 给修改密码按钮添加弹出窗口 -->
    <van-dialog v-model="showPassword" 
    title="修改密码" 
    show-cancel-button
    @confirm="handleChangePassword">
      <van-field v-model="password" placeholder="请输入新密码" />
    </van-dialog>

    <!-- 编辑性别的按钮 -->
    <Listbar label="性别" :tips="['女','男'][userInfo.gender]" @click.native="showGender=true"/>

     <!-- 给编辑性别按钮添加上拉菜单 -->
     <van-action-sheet v-model="showGender" :actions="actions" @select="onSelect" close-on-click-action/>
  </div>
</template>

<script>
import NavigateBar from "@/components/NavigateBar";

import Listbar from "@/components/Listbar";

export default {
  data() {
    return {
      // 用户详情
      userInfo: {},
      // 本地的用户数据
			userJson: {},
			// 是否显示修改用户名弹出框
      show: false,
      // 是否显示修改密码弹出框
      showPassword: false,
      // 是否显示修改性别弹出框
      showGender: false,
      // 单独记录弹窗输入框用户名
      nickname:"",
      // 单独记录弹窗输入框密码
      password:"",
      actions: [
        { name: '男', value:1 },
        { name: '女', value:0 },
      ]
    };
  },
  components: {
    NavigateBar,
    Listbar
  },
  mounted() {
    // 只要能进入这个页面就表示肯定已经登录
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userJson的值是：",userJson);

    // 保存到data,就可以在methods的方法是调用了
    this.userJson = userJson;

    // 请求用户详情
    this.$axios({
      url: "/user/" + userJson.user.id,
      // 添加请求头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log("用户详情的返回结果",res);
      const { data } = res.data;
      //   console.log(data);
      // 保存到data
      this.userInfo = data;
      console.log("userInfo的值是：",this.userInfo);
    });
  },
  methods: {
    //   图片上传的方法
    afterRead(file) {
      //   创建一个表单对象，上传图片资源必须是表单类型，不能用json
      //   不用纠结json还是表单的头信息，axios会自动设置的
      const formData = new FormData();
      console.log(file);

      // 通过原有的方法append给表单添加元素
      // 第一个字符串的 file表示接口接收的属性，第二个file.file是文件对象
      formData.append("file", file.file);

      // file是文件对象（认为它是不可读的）
      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: this.userJson.token
        },
        data: formData
      }).then(res => {
        console.log(res);
        //   url就是图片的路径
        const { url } = res.data.data;
        // 替换掉当前的头像路径
        this.userInfo.head_img = url;

        // 图片上传成功之后调用编辑用户信息的方法
        this.handleEdit({
          head_img: url
        });
      });
    },

    // 编辑用户信息的函数,例如可以修改头像/昵称等
    // data就是请求的参数
    handleEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "POST",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        // console.log(res);
        this.$toast("修改成功");
      });
    },

    // 处理点击修改用户名按钮的事件
    handleChangeNickname(){
      // 调用编辑用户信息的函数
      // 函数中的data需要传普通对象
      this.handleEdit({nickname:this.nickname})
      // 同步的修改当前显示的数据
      this.userInfo.nickname=this.nickname
    },

    // 处理点击修改密码按钮的事件
    handleChangePassword(){
      // 调用编辑用户信息的函数(需要编辑什么就调用接口文档的哪个参数)
      this.handleEdit({password:this.password})
    },

    onSelect(item) {
      console.log(item);
      // 调用编辑用户信息的函数
      this.handleEdit({gender:item.value})
      // 同步修改当前显示的数据
      this.userInfo.gender=item.value
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }

  .uploader {
    position: absolute;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    left: 50%;
    top: 50%;
    transform: translateX(-50 / 360 * 100vw) translateY(-50 / 360 * 100vw);
    opacity: 0;
  }
}
</style>