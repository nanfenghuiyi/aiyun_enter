<template>
  <div>
    <div class="header">
      <i @click="goBack"></i>
      <div>名片录入统计</div>
    </div>
    <div class="header_title">
      <div class="mr-15">录入总数：159条</div>
      <div>有效总数：130条</div>
    </div>
    <div class="section">
      <el-table :data="tableData" style="width: 100%" height="520">
        <el-table-column prop="date" label="时间" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="录入总数" align="center" width="65"></el-table-column>
        <el-table-column prop="province" label="有效条数" align="center" width="70"></el-table-column>
        <el-table-column prop="city" label="无效条数" align="center" width="70"></el-table-column>
        <el-table-column prop="address" label="结算条数" align="center" width="70"></el-table-column>
      </el-table>
      <div class="mt-1">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      page: "",
      page_size: 20,
      access_token: "",
      
      tableData: [
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
        {
          date: "2016-05-07",
          name: "16",
          province: "20",
          city: "43",
          address: "34",
        },
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取数据
    getStatistic(index) {
      var url = this.url;
      var page = index;
      var page_size = this.page_size;
      var obj ={user_id: this.user_id};
      this.axios.post(url, obj).then(res => {
        console.log(res)
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.getStatistic(val);
      console.log(val);
    }
  },
  mounted() {
    if (localStorage.getItem('access_token') != '' && localStorage.getItem('access_token') != null) {
      this.access_token = localStorage.getItem('access_token');
      this.getStatistic(1);
    }else {
      this.$router.push({path: '/'});
      this.$toast('请登录');
    }
  }
};
</script>

<style>
.header {
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
.header_title{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size:14px;
  display: flex;
  justify-content: center;
}
.mr-15{
  margin-right: 15%;
}
.mt-1{
  margin-top: 10px;
}
.section{
  text-align: center;
}
</style>