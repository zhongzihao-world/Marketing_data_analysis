<template>
     <div class="macs">
         <div v-if="msg" style="text-align: center;margin-top:50px;">暂无轨迹点！</div>
           <div id="cctmac" :style="{width: cctmac_x + 'px',height:cctmac_y+'px','margin-bottom':'125px','margin-top':'20px'}"></div>
     </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui';
  import { passenger as passengerApi } from "../../config/request.js";
  export default {
    props:["option"],
    data() {
      return {
        ticket: this.$store.state.ticket.ticket,
        case_filed_id: this.$route.query.case_filed_id,
        cctmac_x:document.documentElement.clientWidth,
        queryOption:[],
        cctmac_y:0,
        mac_x:0,
        mac_y:0,
        personurl:"http://seed.ev-t.top/hourserver/public/uploads/person.png",
        backgruondImg:'',
        trackTimerObj:null,
        area_id:0,
        msg:false,
      }
      
    },
    methods:{
        drawing(){
            this.cctmac.clear();//清空画布
            this.cctmac.resize();//改变画布大小
            this.cctmacOption={
                grid: {
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    show: false
                },
                 xAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    max: this.mac_x,
                    show: false
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    scale: false,
                    show: false,
                    max: this.mac_y
                },     
                series: [{
                    data: [
                        []
                    ],
                    type: 'scatter',
                    symbolSize: 20,
                    symbol: 'image://' + this.personurl,
                    zlevel: 1000
                }, {
                    name: 'line',
                    type: 'line',
                    data: [
                        []
                    ],
                    zlevel: 999,
                    symbol: 'emptyCircle',
                    symbolSize: 13,
                    lineStyle: {
                        normal: {
                            color: '#b14f5c'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#b14f5c'
                        }
                    }
                }],
                graphic: [{
                    type: 'image',
                    id: 'logo',
                    right: "0",
                    top: "0",
                    bounding: 'all',
                    rotation: '0',
                    style: {
                        image: this.backgruondImg,
                        width: this.cctmac_x,
                        height: this.cctmac_y
                    }
                }]
            };
            let seriesData=[];
            for (let i = 0; i < this.areaTreeData.length; i++) {
            const element = this.areaTreeData[i];
            if(this.shopid==element.parent_id){
                let back_x = Number(element.width) * (this.cctmac_x / this.mac_x);
                let back_y = Number(element.height) * (this.cctmac_y / this.mac_y);
                seriesData.push({
                    name: 'pm2.5',
                    type: 'scatter',
                    data: [
                        [element.x + (Number(element.width) / 2), this.mac_y - (element.y + (Number(element.height) / 2)), element.name, element.width, element.height, element.id]
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
        const element = seriesData[j];
        this.cctmacOption.series.push(element);
        }
        this.timerInter();
        },
        areaTree() {//获取小区域信息
            let option = { case_filed_id: this.case_filed_id, ticket: this.ticket };
            passengerApi.areaTree.call(this,option,data => {
                if (data.codeStatus != 200) {
                return Toast(data.codeMsg);
                }
                this.areaTreeData = data.data;
            },(err) => {
                console.info(err);
            });
        },
        getData(){
            Indicator.open({ spinnerType: "fading-circle" });
            if(!this.areaTreeData){
                Toast("请求出错，请返回");
                 return setTimeout(() => {Indicator.close();}, 200);
            }
            //切换区域的数据
            for (let i = 0; i < this.areaTreeData.length; i++) {
                const element = this.areaTreeData[i];
                if(element.id==this.area_id){
                    this.cctmac_y=(element.height*this.cctmac_x)/element.width ;
                    this.mac_x=Number(element.width);
                    this.mac_y=Number(element.height);
                    this.backgruondImg=element.Img_src;
                    this.shopid=element.self_id || element.id;
                    this.area_name=element.name || '';
                }
            }
            let option={
                ticket:this.ticket,
                case_filed_id:this.case_filed_id,
                start_date:this.queryOption.start_date,
                end_date:this.queryOption.end_date,
                mac:this.queryOption.mac,
                area_id:this.area_id
                }
                
             passengerApi.takeVisitorTrack.call(this,option,data => {
                 if(data.codeStatus!=200){return setTimeout(() => {Indicator.close();}, 200);}
                 let macData = data.data.visitorTrack || [];
                 if(!macData.length){
                     this.msg=true;
                     return setTimeout(() => {Indicator.close();}, 200);
                 }
                this.msg=false;//判断是否有数据
                this.linedata=[];//坐标数组
                this.framecount=macData.length;//坐标数
                this.curstep = 0;//当前帧数
                for (var i = 0; i < macData.length; i++) {
                    this.linedata.push([macData[i].x, this.mac_y - macData[i].y]);
                }
                //容器渲染完后再执行画图
                this.$nextTick(function(){
                    this.drawing();
                });
                setTimeout(() => {Indicator.close();}, 200);
             },(err)=>{
                 console.info(err);
                 setTimeout(() => {Indicator.close();}, 200);
             });
        },
        timerInter(){
            let that=this;
            this.trackTimerObj=setInterval(function(){
                //移动数据改变
                that.cctmacOption.series[0].data = [that.linedata[that.curstep]];
                that.cctmacOption.series[1].data.push(that.linedata[that.curstep]);
                that.cctmac.setOption(that.cctmacOption);
                that.curstep++;
                if (that.curstep >= that.framecount) {
                    return clearInterval(that.trackTimerObj)
                }
            },300);
        }
    },
    created() {
    },
    watch:{
        option(newData,oldData){ //监听父组件传过来的值
            this.queryOption=newData;
            this.area_id=this.queryOption.area_id;
            if(this.queryOption.popupMap){
                //清除之前定时器和容器
                this.cctmac.clear();
                clearInterval(this.trackTimerObj);
                this.getData();
            }else{
                //清除之前定时器和容器
                this.cctmac.clear();
                clearInterval(this.trackTimerObj);
            }
            
        }
    },
    mounted(){
        this.cctmac = this.$echarts.init(document.getElementById('cctmac'), 'macarons');
        //绑定区域切换事件
        let that=this;
        this.cctmac.on('click', function(params) {
        Indicator.open({ spinnerType: "fading-circle" });
        that.area_id=params.data[5];
        //切换后清除之前定时器和容器
        that.cctmac.clear();
        clearInterval(that.trackTimerObj);
        that.getData();
        })
        this.areaTree();
       
    }
  }
</script>

<style lang="less" scoped>
    .macs{
        overflow: auto;
        position: absolute;
        top: 0px;
        right: 0;
        height: 100%;
        width: 100%;
        top: 50px;
        left: 0;
        z-index: 100;
    }
</style>

