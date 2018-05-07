<template>
    <div style="margin-top:47px;height: 100%;width: 100%;overflow: scroll;">
       <div class="area">
              <ul>
                <li><span>&nbsp;&nbsp;基本信息</span></li>
                <li>
                  <select name="" id="areaInfo" v-model="area_id" @change="changeFloor">
                      <option v-for="(list,$index) in areaTreeData" :key='$index' :value="list.id">{{list.name}}</option>
                  </select>
                </li>
              </ul>
        </div>

        <div class="area_top">
          <ul>
            <li><span>长:&nbsp;&nbsp;{{width}}米</span></li><span></span>
            <li><span>宽:&nbsp;&nbsp;{{height}}米</span></li>
            <li><span>坐标:&nbsp;X.{{area_x}}&nbsp;&nbsp;Y.{{area_y}}</span></li>
          </ul>
        </div>

        <div id="cctarea" :style="{width: cctarea_x + 'px',height:cctarea_y+'px','margin-bottom':'50px'}"></div>

    </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui'
  import { passenger as passengerApi } from "../../config/request.js";
  export default {
    data() {
      return {
        case_filed_id: this.$route.query.case_filed_id,
        ticket: this.$store.state.ticket.ticket,
        areaTreeData: [],
        area_id:0,
        height:0,
        width:0,
        area_x:0,
        area_y:0,
        cctarea_x:document.documentElement.clientWidth,
        cctarea_y:0,
      }     
    },
   methods:{
    areaTree() {//小区域
      let option = { case_filed_id: this.case_filed_id, ticket: this.ticket };
      passengerApi.areaTree.call(this,option,data => {
          console.log(data)
          if (data.codeStatus != 200) {
            return Toast(data.codeMsg);
          }
          this.areaTreeData = data.data;
          //默认所有区域
          this.height=data.data[0].height;
          this.width=data.data[0].width;
          this.area_x=data.data[0].x;
          this.area_y=data.data[0].y;
          this.shopid=data.data[0].self_id || data.data[0].id;
          this.img=data.data[0].Img_src;
          this.cctarea_y=(this.height*this.cctarea_x)/this.width;
          //容器渲染完后再执行画图
          this.$nextTick(function(){
              this.drawing();
          });
        },(err) => {console.info(err);}
      );
    },
    changeFloor(){//切换小区域
      for (let i = 0; i < this.areaTreeData.length; i++) {
        const element = this.areaTreeData[i];
        if(this.area_id==element.id){
          this.height=element.height;
          this.width=element.width;
          this.area_x=element.x;
          this.shopid=element.self_id || element.id;
          this.area_y=element.y;
          this.img=element.Img_src;
          this.cctarea_y=(this.height*this.cctarea_x)/this.width;
          //容器渲染完后再执行画图
          this.$nextTick(function(){
              this.drawing();
          });
        }
      }
    },
    drawing(){
        this.cctarea.clear();//清空画布
        this.cctarea.resize();//改变画布大小
        this.cctareaOption={
            grid: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            },
            xAxis: [{
                splitArea: {
                    show: true
                },
                max: 20,
                show: false
            }],
            yAxis: [{
                splitArea: {
                    show: true
                },
                max: 50,
                show: false
            }],
            series: [{
                type: 'line',
                data: []
            }],
            graphic: [{
                type: 'image',
                bounding: 'raw',
                style: {
                    image: this.img,
                    width: this.cctarea_x,
                    height: this.cctarea_y,
                    x: 0,
                    y: 0
                }
            }] 
        };
        let graList = [];
            for (let i = 0; i < this.areaTreeData.length; i++) {
                if (this.shopid == this.areaTreeData[i].parent_id) {
                    let graX = this.areaTreeData[i].x * (this.cctarea_x / this.width);
                    let graY = this.areaTreeData[i].y * (this.cctarea_y / this.height);
                    let graW = Number(this.areaTreeData[i].width) * (this.cctarea_x / this.width);
                    let graH = Number(this.areaTreeData[i].height) * (this.cctarea_y / this.height);
                    graList.push({
                        type: 'image',
                        bounding: 'raw',
                        style: {
                            image: this.areaTreeData[i].Img_src,
                            width: graW,
                            height: graH,
                            x: graX,
                            y: graY
                        },
                        
                    })
                }
            }
            for (let z in graList) {
              this.cctareaOption.graphic.push(graList[z]);
            }
        this.cctarea.setOption(this.cctareaOption);
    }
   },
    created() {
    },
    mounted(){
      this.cctarea = this.$echarts.init(document.getElementById('cctarea'), 'macarons');
      this.areaTree();
    }
  }
</script>

<style lang="less" scoped>
.area {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  ul{
    width:100%;
     li{
      display: inline-block;
      width: 30vw;
      span{
        font-size: 14px;
        font-family: '\5FAE\8F6F\96C5\9ED1';
      }
      select{
        width: 30vw;
        padding-left: 3vw;
        border: 1px solid #c5c5c5;
        margin-right: 3vw;
        height: 25px;
        margin-top: 3vw;
        font-family: '\5FAE\8F6F\96C5\9ED1';
        font-size: 14px;
        color: #424242
      }
    }
    li:last-child{
      margin-left: 35%;
      text-align: right;
      color: #FD2A44; 
    }    
  }
}
.area_top{
    // width: 100%;
    margin-top: 49px;
    height: 49px;
    line-height: 49px;
    border: 1px solid #eaeaea;
    ul{
      // width:100%;
      li{
        display:inline-block;
        width: 30vw;
        text-indent: 2%;
        span{
          font-size: 3.5vw;;
          font-family: '\5FAE\8F6F\96C5\9ED1';
        }
      }
    }
}

</style>

