<template>
    <div style="margin-top: 47px;">
      <div>
        <div class="picktime">
          <span style="margin-right: 25%;">&nbsp;&nbsp;数据分析</span>
          <mt-button size="large"  @click.native="open('picker1')">
            <p style="margin:0;line-height:23px;font-size:3.5vw;"> {{startTime}}
            </p>
          </mt-button>-
          <mt-button size="large"  @click.native="open('picker2')">
              <p style="margin:0;line-height:23px;font-size:3.5vw;"> {{endTime}}
              </p>
          </mt-button>       
        </div>
      </div>    
      <mt-datetime-picker
              style="top: 40%;height: 50vw;width: 85vw;border-radius: 2vw;"
              ref="picker"
              type="date"
               cancelText=''
              :visible-item-count="3"
              v-model="startData"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              @confirm="handleChange">
      </mt-datetime-picker>
      
      <div :style="{height: heightX + 'px',width:' 100%',overflow: 'scroll','-webkit-overflow-scrolling': 'touch'}">
        
      <div class="passflow_list">
          <div class="passflow_list_img"><img src="../../assets/img/today_list1.png" style="width:25px"></div>
            <div class="passflow_list_lf">
              <span><p>总男顾客</p></span>
              <p>共统计{{day}}天</p>
            </div>        
          <div class="passflow_list_rf">
              <p><span>{{man}}</span>人</p>
          </div>
      </div>     
      <div class="passflow_list">
          <div class="passflow_list_img"><img src="../../assets/img/today_list3.png" style="width:25px"></div>
            <div class="passflow_list_lf">
              <span><p>总女顾客</p></span>
              <p>共统计{{day}}天</p>
            </div>        
          <div class="passflow_list_rf">
              <p><span>{{woman}}</span>人</p>
          </div>
      </div>
      <div class="passflow_list">
          <div class="passflow_list_img"><img src="../../assets/img/today_list2.png" style="width:25px"></div>
            <div class="passflow_list_lf">
              <span><p>总顾客</p></span>
              <p>共统计{{day}}天</p>
            </div>        
          <div class="passflow_list_rf">
              <p><span>{{people }}</span>人</p>
          </div>
      </div>  
      <div class="passflow_list">
          <div class="passflow_list_img"><img src="../../assets/img/today_list4.png" style="width:25px"></div>
            <div class="passflow_list_lf">
              <span><p>总营收总额</p></span>
              <p>共统计{{day}}天</p>
            </div>        
          <div class="passflow_list_rf">
              <p><span>{{money}}</span>(万元)</p>
          </div>
      </div>
      <div style="height:1050px;">
        <div class="cutoff">
          <span>&nbsp;&nbsp;男女比例情况</span>
        </div>
         <div id="customerlineflow" style="width: 100%;height: 300px;margin-top:5%;"></div>

         <div class="cutoff">
          <span>&nbsp;&nbsp;每月营收额走势</span>
        </div>
        <div id="customerbarflow" style="width: 100%;height: 300px;"></div>

        <div class="cutoff">
          <span>&nbsp;&nbsp;顾客年龄结构</span>
        </div>
         <div id="age" style="width: 100%;height: 300px;"></div>
         <div id="agebar" style="width: 100%;height: 300px;background-color: yellow;margin-bottom: 50px;margin-top: -50px;padding-bottom: 50px;"></div>
      </div>
      </div>

    
    </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import { passenger as passengerApi } from "../../config/request.js";
export default {
  data() {
    function addDate(date, days) {
      var d = new Date(date);
      d.setDate(d.getDate() + days);
      var m = d.getMonth() + 1;
      return d.getFullYear() + "-" + m + "-" + d.getDate();
    }
    return {
      startTime: new Date().Format("2018-01-01"),
      endTime: new Date().Format("yyyy-MM-dd"),
      startData: new Date(),
      dayRange: 7,
      woman: 0,
      day: 7,
      man: 0,
      money: 0,
      heightX: document.documentElement.clientHeight,
      people: 0,
      flow_x: ["1"],
      list_money_x: ["1"],
      list_money_y: [],
      man_count: [],
      woman_count: [],
      agedata: [
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
      ]
    };
  },
  created() {},
  methods: {
    open(picker) {
      this.$refs["picker"].open();
      this.picker = picker;
    },
    //点击时间
    handleChange(value) {
      switch (this.picker) {
        case "picker1":
          this.startTime = new Date(value).Format("yyyy-MM-dd");
          break;
        case "picker2":
          this.endTime = new Date(value).Format("yyyy-MM-dd");
          break;
      }
      this.getData({
        start_date: this.startTime,
        end_date: this.endTime
      });
    },
    getData(option) {
      Indicator.open({ spinnerType: "fading-circle" });
      passengerApi.calculate.call(
        this,
        option,
        data => {
          // console.log(data)
          if (data.code) {
            return;
          }

          //顶层数据
          this.man = data.count_data.peopledata.man_count || 0;
          this.woman = data.count_data.peopledata.woman_count || 0;
          this.people = data.count_data.peopledata.people || 0;
          this.day = data.count_data.peopledata.day_count || 0;
          this.money = data.count_data.money.money_count || 0;

          //年龄组成饼状图
          this.age.showLoading();
          this.agebar.showLoading();
          let age_time = data.count_data.stay_time;
          for (let i = 0; i < this.agedata.length; i++) {
            const element = this.agedata[i];
            for (let key in age_time) {
              if (element.name == key) {
                this.agedata[i].value = age_time[key];
                this.agedata[i].value = age_time[key];
              }
            }
          }
          this.drawage();
          this.drawagebar();
          this.agebar.hideLoading();
          this.age.hideLoading();

          //营收额柱状图
          let money = data.count_data.list_money;
          this.list_money_x = [];
          this.list_money_y = [];
          for (let i = 0; i < money.length; i++) {
            const element = money[i];
            this.list_money_x.push(Object.keys(element));
            this.list_money_y.push(element[Object.keys(element)]);
          }
          this.drawmoney();

          //男女顾客折线图
        },
        err => {
          console.info(err);
        }
      );

      passengerApi.calculateperson.call(
        this,
        Object.assign({ type: 0 }, option),
        data => {
          console.log(data);
          if (data.code) {
            return setTimeout(() => {
              Indicator.close();
            }, 200);
          }
          let persondata = data.persondata;
          this.flow_x = Object.keys(persondata).sort();
          this.man_count = [];
          this.woman_count = [];
          for (let i = 0; i < this.flow_x.length; i++) {
            const element = this.flow_x[i];
            this.man_count.push(persondata[element].man_);
            this.woman_count.push(persondata[element].woman_);
          }
          this.drawpeople();
          setTimeout(() => {
            Indicator.close();
          }, 200);
        },
        err => {
          console.info(err);
          setTimeout(() => {
            Indicator.close();
          }, 200);
        }
      );
    },

    drawpeople() {
      this.customerlineflow.clear();
      this.customerlineflowOption = {
        legend: {
          data: ["男顾客人数", "女顾客人数"],
          left: "left"
        },
        //图片保存按钮
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        grid: {
          left: "1%",
          right: "7%",
          bottom: "3%",
          top: "12%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: [
          {
            name: "日期",
            nameGap: 1,
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                fontSize: 8
              },
              interval: 0
            },
            data: this.flow_x
          }
        ],
        yAxis: [
          {
            name: "/人次",
            nameGap: 4,
            type: "value"
          }
        ],
        series: [
          {
            name: "男顾客人数",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            smooth: true,
            data: this.man_count
          },
          {
            name: "女顾客人数",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            smooth: true,
            data: this.woman_count
          }
        ]
      };
      this.customerlineflow.setOption(this.customerlineflowOption);
    },
    drawmoney() {
      this.customerbarflow.clear();
      this.customerbarflowOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        //图片保存按钮
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        grid: {
          left: "3%",
          right: "7%",
          bottom: "3%",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.list_money_x,
            name: "日期",
            nameGap: 2
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "/万元"
          }
        ],
        series: [
          {
            name: "当月营收额(万元)",
            type: "bar",
            data: this.list_money_y,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  return params.data;
                },
                textStyle: {
                  fontSize: 8
                }
              }
            }
          }
        ]
      };
      this.customerbarflow.setOption(this.customerbarflowOption);
    },
    drawage() {
      this.age.clear();
      this.stoptimepieOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/> {c}人 ({d}%)"
        },
        //图片保存按钮
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.agedata
        },
        series: [
          {
            name: "停留时长",
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: true,
            center: ["48%", "50%"],
            label: {
              normal: {
                show: true,
                // position: "center",
                formatter: "{b}\n {d}%"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "15",
                  fontWeight: "bold"
                }
              }
            },
            data: this.agedata
          }
        ]
      };
      this.age.setOption(this.stoptimepieOption);
    },
    drawagebar() {
      this.agebar.clear();
      this.stoptimebarOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        //图片保存按钮
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        grid: {
          top: "10%",
          left: "1%",
          right: "1%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              this.agedata[0].name,
              this.agedata[1].name,
              this.agedata[2].name,
              this.agedata[3].name,
              this.agedata[4].name
            ],
            axisLabel: {
              interval: 0
            },
            name: "时间段",
            nameGap: 5
          }
        ],
        yAxis: [
          {
            name: "/人",
            type: "value"
          }
        ],
        series: [
          {
            name: "人数",
            type: "bar",
            avoidLabelOverlap: false,
            data: [
              this.agedata[0].value,
              this.agedata[1].value,
              this.agedata[2].value,
              this.agedata[3].value,
              this.agedata[4].value
            ],
            label: {
              normal: {
                show: true,
                position: "top"
                // formatter: function(params) {
                //   return params.data + " (人)";
                // }
              }
            }
          }
        ]
      };
      this.agebar.setOption(this.stoptimebarOption);
    }
  },

  mounted() {
    //初始化画布
    this.customerlineflow = this.$echarts.init(
      document.getElementById("customerlineflow"),
      "macarons"
    );
    this.age = this.$echarts.init(document.getElementById("age"), "macarons");
    this.agebar = this.$echarts.init(
      document.getElementById("agebar"),
      "macarons"
    );
    this.customerbarflow = this.$echarts.init(
      document.getElementById("customerbarflow"),
      "macarons"
    );
    this.drawpeople();
    this.drawmoney();
    this.drawage();
    this.drawagebar();
    this.moveDiv("picker-toolbar", "picker-items");
    function addDate(date, days) {
      var d = new Date(date);
      d.setDate(d.getDate() + days);
      var m = d.getMonth() + 1;
      return d.getFullYear() + "-" + m + "-" + d.getDate();
    }
    this.getData({
      start_date: new Date().Format("2018-01-01"),
      end_date: new Date().Format("yyyy-MM-dd")
    });
  }
};
</script>

<style lang="less" scoped>
.picktime {
  display: flex;
  // position: absolute;
  z-index: 999;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  span {
    font-size: 3.5vw;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    width: 20vw;
    display: inherit;
  }
  select {
    width: 24vw;
    padding-left: 1.2vw;
    border: 1px solid #c5c5c5;
    margin-right: 1vw;
    height: 25px;
    margin-top: 3vw;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-size: 3.5vw;
    color: #424242;
  }
  button {
    height: 25px;
    width: 26vw;
    margin-top: 3vw;
    line-height: 0;
    font-size: 3.5vw;
    background-color: white;
    border: 1px solid #c5c5c5;
    border-radius: 0;
    label {
      font-size: 1.2vw;
      color: #757575;
      font-family: "\5FAE\8F6F\96C5\9ED1";
    }
  }
}

.passflow_list {
  height: 49px;
  padding: 15px;
  border-bottom: 1px solid #eaeaea;
  .passflow_list_img {
    float: left;
    margin-top: 13px;
  }
  .passflow_list_lf {
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
  .passflow_list_rf {
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
.passflow_list:after {
  display: block;
  height: 0;
  content: "";
  clear: both;
}
.mint-button-text {
  font-size: 1.2vw !important;
  overflow: hidden;
  height: 6vw;
  line-height: 6vw;
  display: block;
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
</style>

