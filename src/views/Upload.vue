<template>
  <div class="container">
    <div class="header">
      <i @click="goBack"></i>
      <div>信息录入</div>
    </div>
    <!-- tab标签 -->
    <div class="section">
      <addtext></addtext>
    </div>
  </div>
</template>

<script>
import addtext from "../components/AddText"

export default {
  data () {
    return {
      // activeName: 'first',
    }
  },
  components: {addtext},
  props: {},
  watch: {},
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 进入窗口时提示
    messageBox() {
      this.$alert('注：请根据图片内容，以输入或选择的方式将信息填入下表。一辆车录入一条信息，录入一条则提交一条，直到录入全部车辆、线路信息！如果图片为表格样式，表格有红点标记的行为无效数据，不录入！！请认真录入，感谢合作！', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        showClose: false,
      });
    },
  },
  mounted () {
    if (localStorage.getItem('access_token') != '' && localStorage.getItem('access_token') != null) {
      // 进入窗口时提示
      this.messageBox()
    }else {
      this.$router.push({path: '/'});
      this.$toast('请登录')
    }
    
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  z-index: 99;
  background: rgba(255, 255, 255, 1);
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  display: flex;
  margin: 0 auto;
}
.header i {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: url("../assets/add/left.png") center no-repeat;
}
.header div {
  flex: 1;
  text-align: center;
}
.section{
  margin-top: 44px;
}
</style>
