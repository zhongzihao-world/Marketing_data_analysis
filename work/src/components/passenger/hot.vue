<template>
  <div style="margin-top:47px;height: 100%;width: 100%;overflow: scroll;">
        <!-- <div>
            <img src="../../assets/img/company.jpg" alt="">
        </div> -->


        <div class="hot">
          <span style="margin-right: 25%">&nbsp;&nbsp;热度图</span>
          <mt-button size="large"  @click.native="open('picker1')" style="line-height:23px">
               {{startTime}}
          </mt-button>-
          <mt-button size="large"  @click.native="open('picker2')" style="line-height:23px">
               {{endTime}}
          </mt-button>       
        </div>

        <div style="margin-top:49px"></div>

    <div id="cctmap" :style="{width: picture_x + 'px',height:picture_y+'px','margin-bottom':'125px'}"></div>
   
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
  </div>  
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import { passenger as passengerApi } from "../../config/request.js";
export default {
  data() {
    return {
      customerpicture_data: [],
      startTime: new Date().Format("2018-01-01"),
      endTime: new Date().Format("yyyy-MM-dd"),
      startData:new Date(),
      picture_x:document.documentElement.clientWidth,
      picture_y:400,
      size_x:0,
      size_y:0,
      customerdata:[],
      controller_max:0,
      bgurl:'',
    };
  },
    
  methods: {
    open(picker) {
      this.$refs["picker"].open();
      this.picker=picker;
    },
    handleChange(value) {//点击时间
      switch(this.picker){
        case 'picker1':
          this.startTime = new Date(value).Format("yyyy-MM-dd");
          break;
        case "picker2":
          this.endTime=new Date(value).Format("yyyy-MM-dd");
          break;
      }
      this.getData({
            start_date :this.startTime,
            end_date :this.endTime,
      });
    },
    companypicture() {
      passengerApi.customer.call(this,'',data => {
                    //   console.log(data)
          this.customerpicture_data = data.data;
          this.getData({
            start_date :new Date().Format('yyyy-MM-dd'),
            end_date :new Date().Format("yyyy-MM-dd"),
          });
        },() => {
          console.info("网络繁忙，请求失败！");
        }
      );
    },
    drawing(){
      this.picture.clear();//清空画布
      this.picture.resize();//改变画布大小
      this.cctmapoption={
            name: '热力图',
            backgroundColor: 'white',
            geo: {
              left: 0,
              top: 60,
              right: 0,
              bottom: 0,
              show: false,
              label: {
                  emphasis: {
                      show: false
                  }
              },
              boundingCoords: [
                  // 定位左上角经纬度
                  [0,this.size_y],
                  // 定位右下角经纬度
                  [this.size_x,0]
              ],
              roam: true,
              itemStyle: {
                  normal: {
                      areaColor: '#323c48',
                      borderColor: '#111',
                  },
                  emphasis: {
                      areaColor: '#2a333d',
                  }
              }
            }, 
            series: [{
                    name: '中心区域',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data:this.customerdata,
                    zlevel: 9999,
                }],
                visualMap: [{
                    show: false,
                    type: 'piecewise',
                    dimension:2,
                    // minOpen:true,
                    right: '1%',
                    top: '1%',
                    min: 0,
                    max: this.controller_max,
                    inRange: {
                        color: ['blue', 'blue', 'green', 'yellow', 'red'],
                    },
                    outOfRange: {
                        color: ['rgba(255,255,255,0.2)']
                    }
                }],
                graphic: [{
                    type: 'image',
                    id: 'logo',
                    left: '0',
                    top: '60',
                    bounding: 'all',
                    rotation: 0,
                    style: {
                        image: this.bgurl,
                        width: this.picture_x,
                        height: this.picture_y-60,
                    }
                }]
        };
        
        let seriesData=[];
        if (this.customerpicture_data) {
          const element = this.customerpicture_data[0];
          if(1){
              let back_x = Number(element.width) * (this.picture_x / this.size_x);
              let back_y = Number(element.height) * ((this.picture_y-60) / this.size_y);
              console.log(element.Img_src)
              seriesData.push({
                name: 'pm2.5',
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  data: [
                      [element.x + (Number(element.width) / 2), this.size_y - (element.y + (Number(element.height) / 2)),  element.width, element.height]
                  ],
                  hoverAnimation: false,
                  symbol: 'image://' + element.Img_src,
                  symbolSize: [back_x, back_y],
                  symbolRotate: 0,
                  itemStyle: {
                      normal: {
                          opacity: 1,
                      },
                      emphasis: {
                          shadowBlur: 20,
                          shadowColor: 'rgba(0, 0, 0, 0.6)'
                      }
                  }
              });
          }
          
        }
        for (let j = 0; j < seriesData.length; j++) {
            // console.log(seriesData)
          const element = seriesData[j];
           this.cctmapoption.series.push(element);
        }
        this.picture.setOption(this.cctmapoption);
    },


    getData(option){//获取数据
        Indicator.open({ spinnerType: "fading-circle" });
        // 画图数据
        for (let i = 0; i < 1; i++) {
          const element = this.customerpicture_data[0];
          this.picture_y=(element.height*this.picture_x)/element.width + 60;
          this.size_x=Number(element.width);
          this.size_y=Number(element.height);
          this.bgurl=element.Img_src;
          this.area_name=element.name || '';
      }
        passengerApi.customerdata.call(this,option,data => {
            
            console.log(data)
          let customer_data= data.data;
                      console.log(data)
        //     let option =[]
        //         for(let i=0;i<1000;i++){
        //             let obj={};
        //             obj.energy = customer_data[i].energy
        //             obj.width_grid_num = customer_data[i].width_grid_num
        //             obj.height_grid_num = customer_data[i].height_grid_num;
        //            option.push(obj) 
        //         }
            
        //  passengerApi.customerhot.call(this,option ,data =>{
        //     //  console.log(data)
        // }, () => {console.info("网络繁忙，请求失败！");})



          if(!customer_data){
            this.drawing();
            return setTimeout(() => {Indicator.close();}, 200);
          }
          this.customerdata=[];
          for (let i = 0; i < customer_data.length; i++) {
            const element = customer_data[i];
            if (this.controller_max < element["energy"]) {
                this.controller_max = element["energy"];
            }
            this.customerdata.push([Number(element.width_grid_num),this.size_y-element.height_grid_num,element.energy]);
          }
          this.drawing();
          setTimeout(() => {Indicator.close();}, 200);
        },(err)=>{
          console.info(err);
           setTimeout(() => {Indicator.close();}, 200);
        })
    },
  },
  created() {
    
  },
  mounted() {
    this.picture = this.$echarts.init(document.getElementById('cctmap'), 'macarons');
    this.companypicture();
    this.moveDiv("picker-toolbar","picker-items");
    setTimeout( () => {
        this.getData({
        start_date :new Date().Format('2018-01-01'),
        end_date :new Date().Format("yyyy-MM-dd"),
    })
    }, 3000)
  }
};
</script>

<style lang="less" scoped>
.hot {
  display: flex;
  position: absolute;
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
      font-size: 14px;
      color: #757575;
      font-family: "\5FAE\8F6F\96C5\9ED1";
    }
  }
}
</style>