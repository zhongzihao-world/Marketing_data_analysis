<template>
    <div style="margin-top: 49px;">
          <div class="picktime">
            <span>&nbsp;&nbsp;区域客流</span>
            <mt-button size="large"  @click.native="open('picker1')">
              {{startTime}}
            </mt-button>-
            <mt-button size="large"  @click.native="open('picker2')">
              {{endTime}}
             
            </mt-button>
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
               <div style="height: 5vw;background:white;"></div>

          <div style="height:630px">
                <div class="cutoff">
                    <span>&nbsp;&nbsp;全区域客流</span> <span>&nbsp;&nbsp;该数据来源于wifi嗅探设备</span>
                </div>
                <div id="region_devflow" style="width: 100%;height: 300px;display: none;"></div>
                <div id="region_devflow_gai" style="width: 100%;height: 100px;text-align: center;padding-top: 50px;">全区域客流<div><span id="all_flow" style="font-size: 20px;">0</span>人次</div></div>

                <div class="cutoff">
                    <span>&nbsp;&nbsp;各子区域客流</span>
                </div>
                <div id="region_flow" style="width: 100%;height: 300px;"></div>
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
      startTime: new Date().Format("yyyy-MM-dd"),
      startData: new Date().Format("yyyy-MM-dd"),
      endTime: new Date().Format("yyyy-MM-dd"),
      ticket: this.$store.state.ticket.ticket,
      case_filed_id: this.$route.query.case_filed_id,
      regionflow_xData: [1, 2],
      buildingflow_xData: [1, 2],
      regionflow_yData: [],
      buildingflow_yData: [],
      heightX: document.documentElement.clientHeight
    };
  },
  created() {},
  methods: {
    open(picker) {
      this.$refs["picker"].open();
      this.picker = picker;
    },
    handleChange(value) {
      switch (this.picker) {
        case "picker1":
          this.startTime = new Date(value).Format("yyyy-MM-dd");
          break;
        case "picker2":
          this.endTime = new Date(value).Format("yyyy-MM-dd");
          break;
      }
      this.getDate({
        ticket: this.ticket,
        case_filed_id: this.case_filed_id,
        start_date: this.startTime,
        end_date: this.endTime
      });
    },
    drawRegion() {
      let region_flow = this.$echarts.init(
        document.getElementById("region_flow"),
        "macarons"
      );
      region_flow.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "11%",
          bottom: "3%",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: '子区域',
            nameGap: 3,
            axisLabel: {
              textStyle: {
                fontSize: 8
              },
              interval: 0
            },
            data: this.regionflow_xData
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "/人次"
          }
        ],
        series: [
          {
            barWidth: "30%",
            name: "访问人数：",
            type: "bar",
            label: {
              normal: {
                show: true,
                formatter: function(param) {
                  return param.seriesName + param.data;
                },
                position: "top"
              }
            },
            data: this.regionflow_yData
          }
        ]
      });
      let region_devflow = this.$echarts.init(
        document.getElementById("region_devflow"),
        "macarons"
      );
      region_devflow.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              textStyle: {
                fontSize: 8
              },
              interval: 0
            },
            data: this.buildingflow_xData
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "/人"
          }
        ],
        series: [
          {
            barWidth: "30%",
            name: "访问人数：",
            type: "bar",
            label: {
              normal: {
                show: true,
                formatter: function(param) {
                  return param.seriesName + param.data;
                },
                position: "top"
              }
            },
            data: this.buildingflow_yData
          }
        ]
      });
    },
    getDate(option) {
      Indicator.open({ spinnerType: "fading-circle" });
      passengerApi.areaVisitorFlow.call(
        this,
        option,
        data => {
          if (data.codeStatus != 200) {
            return setTimeout(() => {
              Indicator.close();
            }, 200);
          }
          console.log(data);
          for (var key in data.data.all_area) {
            document.getElementById("all_flow").innerHTML = data.data.all_area[key].num;
          }
          let regionflowData = data.data ? data.data.all_area : [];
          let buildingflowData = data.data ? data.data.child_area : [];

          this.buildingflow_xData = [];
          this.buildingflow_yData = [];
          this.regionflow_xData = [];
          this.regionflow_yData = [];

          //总区域
          for (let region_x in regionflowData) {
            this.buildingflow_xData.push(region_x);
            this.buildingflow_yData.push(regionflowData[region_x].num || 0);
          }
          //子区域
          for (let region_b in buildingflowData) {
            this.regionflow_xData.push(region_b);
            this.regionflow_yData.push(buildingflowData[region_b].num || 0);
          }
          this.drawRegion();
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
    }
  },
  mounted() {
    this.drawRegion();
    this.getDate({
      ticket: this.ticket,
      case_filed_id: this.case_filed_id,
      start_date: new Date().Format("yyyy-MM-dd"),
      end_date: new Date().Format("yyyy-MM-dd")
    });
    this.moveDiv("picker-toolbar", "picker-items");
  }
};
</script>

<style lang="less" scoped>
.picktime {
  display: flex;
  //   position: absolute;
  z-index: 999;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  span {
    font-size: 14px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    width: 36vw;
    display: inherit;
  }
  button {
    height: 25px;
    width: 28vw;
    margin-top: 3vw;
    // line-height: 3vw;
    font-size: 3.5vw;
    background-color: white;
    border: 1px solid #c5c5c5;
    border-radius: 0;
    // margin-right: 2%;
    label {
      font-size: 14px;
      color: #757575;
      font-family: "\5FAE\8F6F\96C5\9ED1";
    }
  }
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

