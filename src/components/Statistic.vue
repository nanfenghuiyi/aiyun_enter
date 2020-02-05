<template>
  <div>
    <div class="header">
      <i @click="goBack"></i>
      <div>名片录入统计</div>
    </div>
    <div class="header_title">
      <div class="mr-15">录入总数：{{all_enter_count}}条</div>
      <div>有效总数：{{all_valid_count}}条</div>
    </div>
    <div class="section"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      style="width: 100%"
    >
      <el-table :data="tableData" style="width: 100%" height="500">
        <el-table-column prop="date" label="时间" align="center" width="100"></el-table-column>
        <el-table-column prop="all_count" label="录入总数" align="center" width="65"></el-table-column>
        <el-table-column prop="valid_count" label="有效条数" align="center" width="70"></el-table-column>
        <el-table-column prop="invalid_count" label="无效条数" align="center" width="70"></el-table-column>
        <el-table-column prop="settlement_count" label="结算条数" align="center" width="70"></el-table-column>
      </el-table>
      <div class="mt-1">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="footer">数据显示每天0点前所统计的数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      page: "",
      page_size: 10,
      access_token: "",
      all_enter_count: 0, // 总数
      all_valid_count: 0, // 有效总数
      total: 1, // 总页数
      
      tableData: [],
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取数据
    getStatistic(index) {
      this.loading = true;
      this.url = this.$global_msg.Statistics;
      var url = this.url;
      let page = index;
      let page_size = this.page_size;
      let access_token = this.access_token
      let obj ={page, page_size, access_token};
      this.axios.post(url, obj).then(res => {
        // console.log(res)
        var res = res.data.data;
        let all_count = res.all_count;
        this.all_enter_count = all_count.all_enter_count == null ? "0" : all_count.all_enter_count;
        this.all_valid_count = all_count.all_valid_count == null ? "0" : all_count.all_valid_count;
        this.tableData = res.records;
        this.total = res.total;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.getStatistic(val);
      // console.log(val);
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
.footer{
  text-align: center;
  font-size: 16px;
  margin-top: 5px;
}
</style>