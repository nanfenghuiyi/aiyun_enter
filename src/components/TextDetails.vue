<template>
  <div class="container">
    <div class="newsStyle">
      <div
        class="newsStyle-border"
        :class="{textActive:dataActive==true, flexActive:dataActive==false}"
        @click="allRecords"
      >全部</div>
      <div :class="{textActive:dataActive==false}" @click="dataPopup" v-text="checkDate"></div>
    </div>
    <div>录入数据： {{addListNum}}条</div>
    <div class="imgNews">
      <ul v-infinite-scroll="onload" infinite-scroll-disabled="disabled" infinite-scroll-immediate="false" infinite-scroll-delay="10">
        <li v-for="(item,i) in addList" :key="i">
          <div class="new-card">
            <div class="new-time">
              <div></div>
              <span v-text="item.add_time"></span>
            </div>
            <div v-text="item.status_val"></div>
            <div @click="lineDetail(item.id)">
              <ul class="bus-line-ul">
                <li v-text="item.full_plate!=''?item.full_plate:'无'"></li>
                <li class="bus-line">
                  <div class="text-details-span" v-text="item.start_name"></div>
                  <div>—</div>
                  <div class="text-details-span" v-text="item.dest_name"></div>
                </li>
                <li v-text="item.phone"></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div class="noneNews" v-if="loading">加载中</div>
      <div class="noneNews" v-if="noMore">暂无更多录入信息</div>
    </div>
    <!-- 日期选择 -->
    <div>
      <van-popup round v-model="dataShow" position="bottom">
        <div class="datatime">
          <p v-text="start" @click="checkStart" :class="{ activeDate:checkActive==true}"></p>至
          <p v-text="end" @click="checkEnd" :class="{ activeDate:checkActive==false}">结束日期</p>
        </div>
        <div>
          <!-- 开始时间 -->
          <van-datetime-picker
            v-if="check"
            v-model="currentDate"
            type="date"
            :formatter="formatter"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="thisData"
            @cancel="endData"
            @change="startChange"
          />
          <!-- 结束时间 -->
          <van-datetime-picker
            v-else
            v-model="currentDate1"
            type="date"
            :formatter="formatter"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="thisData"
            @cancel="endData"
            @change="endChange"
          />
        </div>
      </van-popup>
    </div>
    <!-- 路线详情 -->
    <div>
      <van-popup v-model="lineShow" style="width:80%;height:70%">
        <div class="bus-section">
          <div class="bus-details">录入详情</div>
          <div class="bus-details-img">
            <img :src="path[0]" alt="" @click="imgShow">
            <!-- <el-image  v-viewer
              style="width: 100px; height: 100px"
              :src="path" 
              :preview-src-list="[path]">
            </el-image> -->
          </div>
          <div>
            <ul>
              <li class="bus-details-style">
                <div>车牌</div>
                <div v-text="full_plate"></div>
              </li>
              <li class="bus-details-style">
                <div>类型</div>
                <div v-text="is_flow"></div>
              </li>
              <li class="bus-details-style">
                <div>开始时间</div>
                <div v-text="start_time"></div>
              </li>
              <li>
                <ul v-if="is_time">
                  <li class="bus-details-style">
                    <div>截止时间</div>
                    <div v-text="end_time"></div>
                  </li>
                  <li class="bus-details-style">
                    <div>间隔时间</div>
                    <div v-text="period"></div>
                  </li>
                </ul>
              </li>
              <li class="bus-details-style">
                <div>起点</div>
                <div v-text="start_name"></div>
              </li>
              <li class="bus-details-style">
                <div>终点</div>
                <div v-text="dest_name"></div>
              </li>
              <li class="bus-details-style">
                <div>途径点</div>
                <div v-text="pass_points_name"></div>
              </li>
              <li class="bus-details-style">
                <div>随车电话</div>
                <div v-text="phone"></div>
              </li>
            </ul>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 大图 -->
    <div>
      <van-image-preview
        v-model="bigShow"
        :images="path"
        @change="onChange"
        :show-indicators="true"
      >
      </van-image-preview>
    </div>
  </div>
</template>

<script>
import login from "../components/Login";
import error from "../components/error";
import logout from "../components/logout";

export default {
  inject: ["reload"],
  data() {
    return {
      path: [],
      full_plate: '',
      is_flow: '',
      start_time: '',
      end_time: '',
      period: '',
      start_name: '',
      pass_points_name: '',
      dest_name: '',
      phone: '',
      busPlate: '',
      busStartLine: '',
      busEndLine: '',
      busPhone: '',
      loginStatus: true,
      bigShow: false,
      dataShow: false, // 时间选择页面
      dataActive: true,
      lineShow: false, // 路线详情
      is_time: true, // 是否显示截止时间
      message: "",
      page: 1,
      newPage: 1,
      page_size: 10,
      access_token: "",
      addList: [], // 数据列表
      newList: [], // 今日数据
      addListNum: 0, // 总张数
      newCheck: false,
      loading: false,
      listNum: "",
      checkDate: "筛选",
      currentDate: new Date(),
      currentDate1: new Date(),
      minDate: new Date(2019, 0, 1), // 最小时间
      maxDate: new Date(new Date().getFullYear(), 12, 30), // 最大时间
      check: true,
      year: "",
      month: "",
      day: "",
      start: "", // 开始时间
      end: "", // 结束时间
      checkActive: true,
      loginShow: true, // 登陆组件显示
    };
  },
  components: {
    login,
    error,
    logout
  },
  methods: {
    onload() {
      this.loading = true;
      if (this.newCheck) {
        this.page++;
        this.records(2);
      } else {
        this.page++;
        this.records(1);
      }
    },
    dataPopup() {
      if (localStorage.getItem('access_token') != null && localStorage.getItem("access_token") != '') {
        // this.dataActive = false;
        this.dataShow = true;
      } else {
        this.$toast('请登陆');
        this.$emit('cardChildFn', this.loginShow);
      }
    },
    allRecords() {
      this.newCheck = false;
      if (localStorage.getItem('access_token') != null && localStorage.getItem('access_token') != '') {
        this.dataActive = true;
        this.checkDate = '筛选';
        this.page = 1;
        this.addList = [];
        this.records(1);
      } else {
        this.$emit('cardChildFn', this.loginShow);
        this.$toast('请登陆')
      }
    },
    checkStart() {
      this.check = true;
      this.checkActive = true;
    },
    checkEnd() {
      this.check = false;
      this.checkActive = false;
    },
    data() {
      var nowDate = new Date();
      var start =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate();
      var end =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate();
      this.start = start;
      this.end = end;
    },
    formatter(type, value) {
      if (type === "year") {
        this.year = value;
        return value;
      } else if (type === "month") {
        this.month = value;
        return value;
      }
      this.day = value;
      return value;
    },
    // 时间确定
    thisData() {
      // console.log('时间确定===')
      this.addList = [];
      this.newList = [];
      this.page = 1;
      this.newCheck = true;
      this.records(2);
      this.checkDate = this.start + "至" + this.end;
      this.dataShow = false;
      this.dataActive = false;
    },
    // 取消时间选择
    endData() {
      this.dataShow = false;
      // this.dataActive = true;
    },
    startChange() {
      this.start = this.year + "-" + this.month + "-" + this.day;
      var abc = new Date((this.end + " 00:00:00").replace(/-/g, "/")).getTime();
      var zxc = new Date(
        (this.start + " 00:00:00").replace(/-/g, "/")
      ).getTime();
      if (zxc > abc) {
        this.end = this.start;
      }
    },
    endChange() {
      this.end = this.year + "-" + this.month + "-" + this.day;
      var abc = new Date(this.end + " 00:00:00").getTime();
      var zxc = new Date(this.start + " 00:00:00").getTime();
      if (zxc > abc) {
        this.start = this.end;
      }
    },
    // 上传记录
    records(index){
      var url = this.$global_msg.records;
      // var access_token = localStorage.getItem("access_token");
      var access_token = this.access_token;
      var page = this.page;
      var page_size = this.page_size;
      var start_time = this.start;
      var end_time = this.end;
      var obj1 = { url, access_token, page, page_size };
      var obj2 = { access_token, page, page_size, start_time, end_time };
      var obj = '';
      if (index==1) {
        obj = obj1
      }else {
        obj = obj2
      }
      // console.log(obj)
      this.axios.post(url, obj).then(res => {
        var data = res.data;
        // console.log(data)
        if (data.code == 4001) {
          this.$store.commit('_removeToken', 'access_token');
          this.$store.commit('_removeUsername', 'username');
          this.$toast('请重新登录')
        }else {
          if (data.data.total == null) {
            this.addListNum = 0;
          } else {
            var list = data.data.records;
            this.listNum = list.length;
            this.count += this.listNum;
            if (index==1) {
              this.addList = this.addList.concat(list);
            }else {
              this.newList = this.newList.concat(list);
              this.addList = this.newList;
            }
            this.addListNum = data.data.total;
            this.loading = false;
          }
        }
      });
    },
    // 详情记录
    lineDetail(e) {
      this.path = [];
      this.full_plate = '';
      this.is_flow = '';
      this.start_time = '';
      this.end_time = '';
      this.period = '';
      this.start_name = '';
      this.pass_points_name = '';
      this.dest_name = '';
      this.phone = '';
      this.lineShow = true;
      var url = this.$global_msg.detail;
      var access_token = this.access_token;
      var obj = {access_token:access_token, id:e}
      // console.log('lineDetail===',obj)
      this.axios.post(url,obj)
      .then(res=>{
        // console.log(res)
        var data = res.data.data;
        // console.log(data);
        var pathList = data.path;
        for (let i = 0; i < pathList.length; i++) {
          // console.log(pathList[i])
          this.path.push(pathList[i])
        }
        // console.log(this.path)
        this.full_plate = data.full_plate!=''?data.full_plate:'无';
        this.is_time = data.is_flow==2 ? true : false;
        this.is_flow = data.is_flow==2 ? '流水班次' : '固定班次';
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.period = data.period+'分钟';
        this.start_name = data.start_name;
        if(data.pass_points.length ==1 ){
          this.pass_points_name = data.pass_points[0].pass_name
        }else if(data.pass_points.length > 1){
          for (var name of data.pass_points) {
            this.pass_points_name=this.pass_points_name+'-'+name.pass_name
          };
        }else {
          this.pass_points_name = '无';
        }
        this.dest_name = data.dest_name != null ? data.dest_name : '无';
        this.phone = data.phone != null ? data.phone : '无';
      })
    },
    // 图片放大显示
    imgShow() {
      // this.lineShow = false;
      this.bigShow = true;
    },
    onChange(index) {
      this.index = index;
    },
  },
  computed: {
    noMore() {
      return this.addList.length >= this.addListNum;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted() {
    if (localStorage.getItem('access_token') != '' && localStorage.getItem('access_token') != null) {
      this.access_token = localStorage.getItem('access_token');
      this.records(1);
    }
    this.data();
  }
};
</script>

<style scoped>
/*  */
.newsStyle {
  display: flex;
  align-items: center;
  width: 375px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-bottom: 4px;
}
.newsStyle div {
  flex: 1;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(151, 151, 151, 1);
  line-height: 20px;
}
.flexActive {
  flex: 0.5 !important;
}
.textActive {
  color: rgba(18, 165, 137, 1) !important;
}
.newsStyle-border {
  border-right: 1px solid #979797;
}
.imgNews {
  overflow: auto;
  /* 有tab */
  /* height: 435px; */
  height: 475px;
  width: 375px;
  margin: 0 auto;
  margin-top: 4px;
}
.imgNews > ul > li {
  width: 350px;
  height: 50px;
  /* line-height: 70px; */
  margin: 0 auto;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border-bottom: 1px solid #000;
  padding: 10px 0;
}
/* *** */
.bus-line-ul{
  /* border:1px solid red; */
  width:100px;
  text-align: left;
}
.bus-line{
  display: flex;
}
.text-details-span{
  width: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
/*  */
.new-card {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.new-time {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.new-time div {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(93, 179, 129, 1);
  margin-right: 10px;
}
.new-time span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
/* *** */
/*  */
.noneNews {
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}
.datatime {
  width: 375px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.datatime p {
  width: 150px;
  border-bottom: 1px solid #888;
}
.activeDate {
  color: #1989fa;
  border-bottom: 1px solid #1989fa !important;
}
/* *** */
/* 路线详情 */
.bus-details{
  font-size:16px;
  padding: 14px 0 25px;
}
.bus-details-img{
  margin: 0 auto 20px;
}
.bus-details-img, .bus-details-img img{
  width: 100px;
  height: 100px;
}
.bus-details-style{
  display: flex;
  justify-content: space-between;
}
.bus-details-style>div{
  padding: 10px 15px;
}
</style>

<style>
/**
 *所有组件样式修改
 */
/* 弹出框 */
.van-popup--center.van-popup--round {
  border-radius: 6px !important;
}
.van-picker__cancel,
.van-picker__confirm {
  flex: 1;
  font-size: 0.5rem !important;
}
/* 图片查看器 */
.viewer-toolbar .viewer-one-to-one,
.viewer-play,
.viewer-flip-horizontal,
.viewer-flip-vertical {
  display: none !important;
}
</style>