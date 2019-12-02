<template>
  <div class="container">
    <div class="container-header">
      <div class="header-user" @click="isLogin">
        <div class="header-login">
        <div class="login-img">
          <img src="../assets/home/user.png" alt />
        </div>
        <div class="login-phone">
          <span v-text="title"></span>
        </div>
      </div>
      <div>
        <div class="uploadCard" @click="getAdd">
          <img src="../assets/home/editor.png" alt />
          点击开始录入
        </div>
      </div>
      </div>
    </div>
    <!-- tab标签 -->
    <div>
      <textdetails @cardChildFn="cardParentFn"></textdetails>
    </div>
    <!-- 登录窗口 -->
    <div>
      <van-popup round v-model="loginShow" :closeOnClickOverlay='closeClick'>
        <login @errorChildFn="errorParentFn"></login>
      </van-popup>
    </div>
    <!-- 登出窗口 -->
    <div>
      <van-popup round v-model="logoutShow">
        <logout @logoutChildFn="logoutParentFn" @cancelChildFn="cancelParentFn"></logout>
      </van-popup>
    </div>
    <!-- 忘记密码 -->
    <div>
      <van-popup round v-model="errorShow">
        <error></error>
      </van-popup>
    </div>
  </div>
</template>

<script>
import textdetails from "../components/TextDetails"
import login from "../components/Login"
import logout from "../components/logout"
import error from "../components/error"

export default {
  data () {
    return {
      title: '登录账号',
      loginShow: false,
      logoutShow: false,
      errorShow: false,
      numCard: 0,
      numLine: 0,
      closeClick: false, // 点击遮罩层不返回
    }
  },
  components: {textdetails,login,logout,error},
  props: {},
  watch: {},
  computed: {},
  methods: {
    isLogin() {
      if (localStorage.getItem('username') != '' && localStorage.getItem('username') != null) {
        this.logoutShow = true;
        // this.loginShow = true;
      }else {
        this.loginShow = true;
        // this.logoutShow = true;
      }
    },
    // 登出
    logoutParentFn(payload) {
      this.logoutShow = payload.logoutShow;
    },
    cancelParentFn(payload) {
      this.logoutShow = payload;
      // console.log(payload)
    },
    // 忘记密码
    errorParentFn(payload) {
      // console.log(payload)
      this.errorShow = true
    },
    getAdd() {
      if (localStorage.getItem('username') != '' && localStorage.getItem('username') != null) {
        this.$router.push({ path: "/Upload" });
      } else {
        this.$toast('请登录')
        this.loginShow = true;
      }
    },
    // 未登陆提示登陆
    cardParentFn(payload) {
      this.loginShow = payload;
    },
  },
  mounted () {
    if (localStorage.getItem('username') != '' && localStorage.getItem('username') != null) {
      this.title = localStorage.getItem('username');
    }else {
      
    }
  }
}
</script>

<style scoped>
.container{
  /* width: 100%; */
  max-width: 1000px;
}
.container-header{
  width: 100%;
  height: 100px;
  background: rgba(18, 165, 137, 1);
}
.header-user{
  display: flex;
  justify-content: space-between;
}
.header-login{
  display: flex;
  justify-content: left;
  margin-left: 20px;
  margin-top: 30px;
}
.login-img {
  width: 50px;
  height: 50px;
  background: rgba(202, 243, 235, 1);
  border-radius: 6px;
  border: 2px solid rgba(2, 131, 106, 1);
  box-sizing: border-box;
  margin: 0 auto;
}
.login-img>img{
  margin-top: 3px;
}
.login-phone{
  font-size:18px;
  color: #fff;
  margin-top: 15px;
  margin-left: 10px;
}
.uploadCard {
  font-size: 11px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
  margin-right: 20px;
}
.uploadCard > img {
  width: 30px;
  height: 30px;
}
.user-news{
  display: flex;
  font-size:12px;
  color: #fff;
  margin-top: 10px;
  margin-left: 20px;
}
.cardAll{
  margin-right: 30px;
}
</style>
