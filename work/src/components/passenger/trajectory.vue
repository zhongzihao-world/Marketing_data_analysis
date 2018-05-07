<template>
        <div style="margin-top: 47px;height: 100%;width: 100%;overflow: scroll;">
            <div class="picktime">
                <span style="margin-right: 25%;">&nbsp;&nbsp;顾客信息</span>
                <mt-button size="large"  @click.native="open('picker1')" style="line-height:23px">
                     {{startTime}}
                </mt-button>-
                <mt-button size="large"  @click.native="open('picker2')" style="line-height:23px">
                     {{endTime}}
                </mt-button>       
            </div>
            <mt-datetime-picker
                    style="top: 40%;height: 50vw;width: 85vw;border-radius: 2vw;"
                    ref="picker"
                    cancelText=''
                    type="date"
                    :visible-item-count="3"
                    v-model="startData"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @confirm="handleChange">
            </mt-datetime-picker>
        <div class="trajectory">
            <table>
                <thead style="position: fixed;right: 0;left: 0;top: 95px;background: white;z-index: 99;border-bottom:1px solid #ccc;">
                    <tr>
                        <th style="width:34vw;">顾客名字</th>
                        <th style="width:20vw;">停留时间</th>
                        <th style="width:20vw;">性别</th>
                        <th style="width:20vw;">操作</th>
                    </tr>
                </thead>
            </table>
            <mt-loadmore style="margin-top: 98px;margin-bottom:50px;" :bottom-method="getData" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
            <table>
                <tbody>
                    <tr v-if="!customer_data.length" style="margin-top:50px;">
                        <td>暂无顾客信息！</td>
                    </tr>
                    <tr v-for="_data in customer_data">
                        <td style="width:34vw;">{{_data.customername}}</td>
                        <td style="width:20vw;" >{{_data.time}}</td>
                        <td style="width:20vw;">{{_data.sex}}</td>
                        <td style="width:20vw;"><button @click="getinfo(_data)">查看详情</button></td>
                    </tr>
                </tbody>   
            </table>
            </mt-loadmore>

            <mt-popup v-model="popupcustometinfo" position="left" class="mint-popup-3" :modal="false">
                <div class="select_department_top">
                    <div class="top_lf">
                        <span @click="quit"><返回</span>
                        <span>详细信息</span>
                    </div>                  
                </div>
                <div class="customerinfo">
                    <div class="customerinfo_list">名字:&nbsp;&nbsp;{{customerinfo.name}}</div>
                    <div class="customerinfo_list">年龄:&nbsp;&nbsp;{{customerinfo.age}}</div>
                    <div class="customerinfo_list">性别:&nbsp;&nbsp;{{customerinfo.sex}}</div>
                    <div class="customerinfo_list">手机号码:&nbsp;&nbsp;{{customerinfo.phone}}</div>
                    <div class="customerinfo_list">停留时间:&nbsp;&nbsp;{{customerinfo.time}}秒</div>
                    <div class="customerinfo_list">前往时间:&nbsp;&nbsp;{{customerinfo.date}}</div>
                </div>
            </mt-popup>
            </div>
        </div>
  
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import { passenger as passengerApi } from "../../config/request.js";
export default {
    data() {
        return {
        popupcustometinfo:false,
        bottomStatus: '',
        allLoaded:false,
        startTime:new Date().Format('yyyy-MM-dd'),
        endTime:new Date().Format('yyyy-MM-dd'),
        startData:new Date(),
        //顾客详情
        customerinfo:'',
        //列表
        customer_data: [],
        currentPage:0,
        }      
    },
    methods: {
        open(picker) {
                this.$refs["picker"].open();
                this.picker=picker;
        },
        handleBottomChange(){
                this.bottomStatus = status;
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
            this.currentPage=0;
            this.customer_data=[];
            this.getData();
        },
        getData(){
            this.currentPage+=1;
            let option= { 
                start_date:this.startTime,
                end_date:this.endTime,
                currentPage: this.currentPage,
                pageSize: 14
            };
            Indicator.open({ spinnerType: "fading-circle" });
            passengerApi.customerinfo.call(this,option,data => {
                    console.log(data)
                    console.log(option)
                if(data.code){//没有数据
                    return  setTimeout(() => {
                        Toast({
                            message: '没有更多数据！',
                            duration : 600
                        });
                        Indicator.close();
                        }, 200)
                    }
                if(!data.customerinfo.customerList){ 
                    setTimeout(() => {Indicator.close();}, 200);
                    return  this.allLoaded = false;
                    }
                this.customer_data= this.customer_data.concat(data.customerinfo.customerList);
                if(this.customer_data.length==data.customerinfo.pageInfo.listSize){
                    this.allLoaded = true;
                }else{
                    this.allLoaded = false;
                    this.$refs.loadmore.onBottomLoaded();
                }
                setTimeout(() => {Indicator.close();}, 200);
               
                },(err)=>{
                    console.info(err);
                    setTimeout(() => {Indicator.close();}, 200);
                })
        },
        getinfo(_data){//跳转查看顾客信息
            this.popupcustometinfo=true;
            this.customerinfo={
                age: _data.age,
                name: _data.customername,
                date: _data.date,
                phone: _data.phone,
                sex: _data.sex,
                time: _data.time
            }
        },
        quit(){
            this.popupcustometinfo=false;       
        }
    },
    created() {
    },
    mounted(){
        this.moveDiv("picker-toolbar","picker-items");
    },
}
</script>

<style lang="less" scoped>
 .picktime {
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
    margin-top: 11px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-size: 14px;
    color: #424242;
  }
  button {
    height: 25px;
    width: 26vw;
    margin-top: 11px;
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
.mint-popup-3 {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
.trajectory{
    width:100%;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    line-height: 18px;
    font-size: 15px;
    font-style: normal;
    color: #333333;
    table{
        border-spacing: 0;
        width:100%;
         tr{
             height:50px;
         }
         thead{
             position: none;
         }
         tbody{
            td{
                font-size: 14px;
                border-top: 1px solid #c0c0c0;
                padding: 5px;
                text-align: center;
                button{
                    padding:7px;
                    background-color:#fd2e4a;
                    color:#fefeff;
                    border: 0;
                    border-radius: 5px;
                }    
            }
            tr:hover {
                background: #eeeeee;
                color:#333333;
            }
         }
    }

}
.top_lf{
    height: 49px;
    line-height: 49px;
    border-bottom:1px solid #cccccc;
    span:first-child{
    display: inline-block;
    width: 38vw;
    padding-left: 4vw;
    }
}
.customerinfo{
    // text-align: center;
    width: 100%;
    padding: 10%;
    .customerinfo_list{
        width: 60%;
        margin: 10px auto 10px auto;
    }
}
</style>

