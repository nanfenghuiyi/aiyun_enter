(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-447e4ad2"],{"189d":function(t,a,e){"use strict";var l=e("e41e"),n=e.n(l);n.a},8906:function(t,a,e){"use strict";e.r(a);var l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"header"},[e("i",{on:{click:t.goBack}}),e("div",[t._v("名片录入统计")])]),e("div",{staticClass:"header_title"},[e("div",{staticClass:"mr-15"},[t._v("录入总数："+t._s(t.all_enter_count)+"条")]),e("div",[t._v("有效总数："+t._s(t.all_valid_count)+"条")])]),e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"section",staticStyle:{width:"100%"},attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",data:t.tableData}},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,height:"500"}},[e("el-table-column",{attrs:{prop:"date",label:"时间",align:"center",width:"100"}}),e("el-table-column",{attrs:{prop:"all_count",label:"录入总数",align:"center",width:"65"}}),e("el-table-column",{attrs:{prop:"valid_count",label:"有效条数",align:"center",width:"70"}}),e("el-table-column",{attrs:{prop:"invalid_count",label:"无效条数",align:"center",width:"70"}}),e("el-table-column",{attrs:{prop:"settlement_count",label:"结算条数",align:"center",width:"70"}})],1),e("div",{staticClass:"mt-1"},[e("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1),e("div",{staticClass:"footer"},[t._v("数据显示每天0点前所统计的数据")])])},n=[],i={data:function(){return{url:"",page:"",page_size:10,access_token:"",all_enter_count:0,all_valid_count:0,total:1,tableData:[],loading:!1}},methods:{goBack:function(){this.$router.go(-1)},getStatistic:function(t){var a=this;this.loading=!0,this.url=this.$global_msg.Statistics;var e=this.url,l=t,n=this.page_size,i=this.access_token,o={page:l,page_size:n,access_token:i};this.axios.post(e,o).then((function(t){t=t.data.data;var e=t.all_count;a.all_enter_count=null==e.all_enter_count?"0":e.all_enter_count,a.all_valid_count=null==e.all_valid_count?"0":e.all_valid_count,a.tableData=t.records,a.total=t.total,a.loading=!1})).catch((function(t){console.log(t),a.loading=!1}))},handleCurrentChange:function(t){this.getStatistic(t)}},mounted:function(){""!=localStorage.getItem("access_token")&&null!=localStorage.getItem("access_token")?(this.access_token=localStorage.getItem("access_token"),this.getStatistic(1)):(this.$router.push({path:"/"}),this.$toast("请登录"))}},o=i,s=(e("189d"),e("2877")),c=Object(s["a"])(o,l,n,!1,null,null,null);a["default"]=c.exports},e41e:function(t,a,e){}}]);