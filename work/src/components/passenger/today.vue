<template>
    <div style="margin-top: 49px;">
          <div class="picktime">
             <span style="margin-right: 40%;">&nbsp;&nbsp;每月详情</span>
              <mt-button size="large"  @click.native="open('picker')">
               {{startTime}}           
              </mt-button>
          </div>
          <mt-datetime-picker
                style="top: 40%;height: 50vw;width: 85vw;border-radius: 2vw;"
                ref="picker"
                type="date"
                :visible-item-count="3"
                v-model="startData"
                cancelText=''
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleChange">
          </mt-datetime-picker>

          <div :style="{height: heightX + 'px',width:' 100%',overflow: 'scroll','-webkit-overflow-scrolling': 'touch'}">
          
          <div class="today_list">
            <div class="today_list_img"><img src="../../assets/img/today_list1.png" style="width:25px"></div>
              <div class="today_list_lf">
                <span><p>今月男顾客人数</p></span>
                <p>同比上月{{man_rate > 0 ? '上升' : '下降'}}<i :class="man_rate > 0 ? 'icon-on' : 'icon-off' "></i>&nbsp;<span :style="man_rate > 0 ? 'color:green' : 'color : red'">{{Math.abs(man_rate)}}%</span></p>
              </div>        
            <div class="today_list_rf">
                <p><span>{{current_man}}</span>人</p>
            </div>
          </div>
          <div class="today_list">
            <div class="today_list_img"><img src="../../assets/img/today_list4.png" style="width:25px"></div>
              <div class="today_list_lf">
                <span><p>今月女顾客人数</p></span>
                <p>同比上月{{woman_rate > 0 ? '上升' : '下降'}}<i :class="woman_rate > 0 ? 'icon-on' : 'icon-off' "></i>&nbsp;<span :style="woman_rate > 0 ? 'color:green' : 'color : red'">{{Math.abs(woman_rate)}}%</span></p>
              </div>        
            <div class="today_list_rf">
                <p><span>{{current_woman}}</span>人</p>
            </div>
          </div>
          <div class="today_list">
            <div class="today_list_img"><img src="../../assets/img/today_list3.png" style="width:25px"></div>
              <div class="today_list_lf">
                <span><p>当月顾客总数</p></span>
                <p>同比上月{{totalCustomer_rate > 0 ? '上升' : '下降'}}<i :class="totalCustomer_rate > 0 ? 'icon-on' : 'icon-off' "></i>&nbsp;<span :style="totalCustomer_rate > 0 ? 'color:green' : 'color : red'">{{Math.abs(totalCustomer_rate)}}%</span></p>
              </div>        
            <div class="today_list_rf">
                <p><span>{{totalCustomer}}</span>人</p>
            </div>
          </div>
          <div class="today_list">
            <div class="today_list_img"><img src="../../assets/img/today_list5.png" style="width:25px"></div>
              <div class="today_list_lf">
                <span><p>当月人均停留时间</p></span>
                <p>对比昨日{{stay_time_rate > 0 ? '上升' : '下降'}}<i :class="stay_time_rate > 0 ? 'icon-on' : 'icon-off' "></i>&nbsp;<span :style="stay_time_rate > 0 ? 'color:green' : 'color : red'">{{Math.abs(stay_time_rate)}}%</span></p>
              </div>        
            <div class="today_list_rf">
                <p><span>{{staytime}}秒</span></p>
            </div>
          </div> 
          <div class="today_list">
            <div class="today_list_img"><img src="../../assets/img/today_list2.png" style="width:25px"></div>
              <div class="today_list_lf">
                <span><p>当月营收额</p></span>
                <p>同比上月{{money_rate > 0 ? '上升' : '下降'}}<i :class="money_rate > 0 ? 'icon-on' : 'icon-off' "></i>&nbsp;<span :style="money_rate > 0 ? 'color:green' : 'color : red'">{{Math.abs(money_rate)}}%</span></p>
              </div>        
            <div class="today_list_rf">
                <p><span>{{money}}</span>(万元)</p>
            </div>
          </div>  

          <div style="height:550px; margin-top:0px">
            <div class="cutoff">
              <span>&nbsp;&nbsp;年龄结构</span>
          </div>
          <div id="stoptime" style="width: 100%;height: 200px;color: #333333;"></div>

          <div class="cutoff">
            <span>&nbsp;&nbsp;男女顾客情况</span>
          </div>
          <div id="newold" style="width: 100%;height: 200px;"></div>
          </div>
        </div>  
    </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import { passenger as passengerApi } from "../../config/request.js";
export default {
  data() {
    return {
      timechange: false,
      popupVisible: false,
      startData: new Date(),
      startTime: new Date().Format("yyyy-MM-dd"),
      //每月详情数据    
      current_man: 0,
      man_rate: 0,
      current_woman: 0,
      woman_rate: 0,
      totalCustomer: 0,
      totalCustomer_rate: 0,
      staytime: 0,
      stay_time_rate: 0,
      money: 0,
      money_rate: 0,
      //饼状图
      mandata: [
        {
          value: 0,
          name: "女顾客总数"
        },
        {
          value: 0,
          name: "男顾客总数"
        }
      ],
      //饼状图
      stoptimedata: [
        {
          value: 0,
          name: "20-30岁",
          step: 10
        },
        {
          value: 0,
          name: "30-40岁",
          step: 30
        },
        {
          value: 0,
          name: "40-50岁",
          step: 60
        },
        {
          value: 0,
          name: "50-60岁",
          step: 120
        },
        {
          value: 0,
          name: "60岁以上",
          step: 120
        }
      ],
      heightX: document.documentElement.clientHeight
    };
  },
  created() {},
  methods: {
    //获取小区域信息
    areaTreeareaTree() {
      let option = { case_filed_id: this.case_filed_id, ticket: this.ticket };
      passengerApi.areaTree.call(
        this,
        option,
        data => {
          if (data.codeStatus != 200) {
            return Toast(data.codeMsg);
          }
          this.areaTreeData = data.data;
        },
        () => {
          console.info("网络繁忙，请求失败！");
        }
      );
    },
    //弹出时间选择
    open(picker) {
      this.$refs[picker].open();
    },
    //点击时间
    handleChange(value) {
      this.startTime = new Date(value).Format("yyyy-MM-dd");
      this.getToday({
        start_date: this.startTime,
      });
    },
    //每月详情
    getToday(option) {
      Indicator.open({ spinnerType: "fading-circle" });

      passengerApi.todaydata.call(
        this,
        option,
        data => {
            console.log(data)
          if (data.code) {
            return;
          }
              this.man_rate = data.tomonthdata.man.man_rate || 0;
              this.current_man = data.tomonthdata.man.current_man || 0;

              this.woman_rate = data.tomonthdata.woman.woman_rate || 0;
              this.current_woman = data.tomonthdata.woman.current_woman || 0;

              this.totalCustomer_rate = data.tomonthdata.total.totalCustomer_rate || 0;
              this.totalCustomer = data.tomonthdata.total.totalCustomer || 0;

              this.stay_time_rate = data.tomonthdata.time.stay_time_rate || 0
              this.staytime = data.tomonthdata.time.staytime;
              
              this.money_rate = data.tomonthdata.money.money_rate ||0
              this.money = data.tomonthdata.money.money ||0


            this.stoptime.showLoading();
            this.newold.showLoading();
            //停留时长
            let stay_time_data = data.tomonthdata.stay_time || [];
            this.stoptimedata.map(function(list) {
                list.value = stay_time_data[list.name];
            });
            this.draw_staytime(); //画图
            this.stoptime.hideLoading();

            //男女顾客情况
            let total_man =['男顾客','女顾客'];
            this.mandata[0].value = data.tomonthdata.man.current_man || 0;
            this.mandata[1].value = data.tomonthdata.woman.current_woman || 0;
            this.drawOld(); //画图
            this.newold.hideLoading();

            setTimeout(() => {
            Indicator.close();
          }, 600);

            
        },
        err => {
          console.log(err);
        }
      );
    },
    
    draw_staytime() {
      this.stoptime.clear();
      this.stoptimeOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b} {c}人 ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: [
            this.stoptimedata[0].name,
            this.stoptimedata[1].name,
            this.stoptimedata[2].name,
            this.stoptimedata[3].name,
            this.stoptimedata[4].name
          ]
        },
        series: [
          {
            name: "停留时长",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                formatter: "{b} {c}人 {d}%",
                markPoint: {
                  symbolSize: [1, 1]
                },
                textStyle: {
                  fontSize: 10
                }
              }
            },
            labelLine: {
              normal: {
                length: 0,
                length2: 6
              }
            },
            data: this.stoptimedata            
          }
        ]
      };
      this.stoptime.setOption(this.stoptimeOption);
    },
    drawOld() {
      this.newold.clear();
      this.newoldOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/> {c}人 ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: [this.mandata[0].name, this.mandata[1].name]
        },
        series: [
          {
            name: "新老客户",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                formatter: "{b} {c}人 {d}%",
                markPoint: {
                  symbolSize: [1, 1]
                },
                textStyle: {
                  fontSize: 10
                }
              }
            },
            labelLine: {
              normal: {
                length: 0,
                length2: 6
              }
            },
            data: this.mandata
          }
        ]
      };
      this.newold.setOption(this.newoldOption);
    },
  },
  mounted() {
    this.stoptime = this.$echarts.init(
      document.getElementById("stoptime"),
      "macarons"
    );
    this.newold = this.$echarts.init(
      document.getElementById("newold"),
      "macarons"
    );
    this.draw_staytime();
    this.drawOld();
    this.getToday({
      start_date: new Date().Format("yyyy-MM-dd"),
    });
    this.moveDiv("picker-toolbar", "picker-items");
    console.log(this.$store.state.user.userinfo.username)
  }
};
</script>

<style lang="less" scoped>
.picktime {
  display: flex;
  // position: absolute;
  z-index: 999;
  right: 0;
  left: 0;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  span {
    font-size: 14px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    width: 30vw;
    display: inherit;
  }
  select {
    width: 30vw;
    padding-left: 3vw;
    border: 1px solid #c5c5c5;
    margin-right: 3vw;
    height: 25px;
    margin-top: 3vw;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-size: 3.5vw;
    color: #424242;
  }
  button {
    height: 25px;
    width: 28vw;
    margin-top: 3vw;
    line-height: 0;
    font-size: 3.5vw;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    background-color: white;
    border: 1px solid #c5c5c5;
    border-radius: 0;
    label {
      font-size: vw;
      color: #757575;
      font-family: "\5FAE\8F6F\96C5\9ED1";
    }
  }
}
.show {
  display: block;
}
.hide {
  display: none;
}

.common() {
  font-family: "icomoon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  height: 30px;
  font-size: 30px;
  color: #2ec7c9;
  -webkit-font-smoothing: antialiased;
}

.person_title {
  .mint-cell-wrapper:before {
    content: "\e902";
    .common();
  }
}

.down_title {
  .mint-cell-wrapper:before {
    content: "\e903";
    .common();
  }
}
.time_title {
  .mint-cell-wrapper:before {
    content: "\e904";
    font-size: 27px !important;
    margin-right: 3px;
    .common();
  }
}
.up_title {
  .mint-cell-wrapper:before {
    content: "\e907";
    .common();
  }
}
.icon-on {
  color: green;
}
.icon-off {
  color: red;
  font-size: 1.5vw;
}
.line {
  height: 3vh;
  background: #f2f2f2;
}
.cutoff {
  height: 25px;
  line-height: 25px;
  background: #f2f2f2;
  span {
    font-size: 14px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    color: #333333;
  }
}

.today_list {
  height: 49px;
  padding: 15px;
  border-bottom: 1px solid #eaeaea;
  .today_list_img {
    float: left;
    margin-top: 13px;
  }
  .today_list_lf {
    float: left;
    margin-left: 2%;
    p {
      margin: 0 10px;
      color: #212121;
      font-size: 13px;
      font-family: "\5FAE\8F6F\96C5\9ED1";
    }
    span p {
      font-size: 18px;
      color: #333333;
      margin-bottom: 2%;
    }
  }
  .today_list_rf {
    float: right;
    p {
      font-size: 18px;
      line-height: 13px;
      span {
        font-size: 20px;
      }
    }
  }
}
.today_list:after {
  display: block;
  height: 0;
  content: "";
  clear: both;
}
</style>

