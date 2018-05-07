<template>
  <div style="margin-top: 49px;height: 100%;width: 100%;overflow: scroll;">
        <div class="map_nav">
          <span>&nbsp;&nbsp;带客轨迹</span>
          <select name="" id="areaInfo" v-model="area_id">
            <option v-for="(list,$index) in areaTreeData" :key='$index' :value="list.id">{{list.name}}</option>
          </select>
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

        <div class="map_top">
              <ul>
                <li @click="popupDept=true"><span style="color:red;">{{deptName}}&nbsp;></span></li>
              </ul>
              <mt-popup v-model="popupDept" position="left" class="mint-popup-3" :modal="false">
                <div class="select_department_top">
                  <div class="top_lf">
                    <div @click="popupDept=false;" style="width:50px"> <返回 </div>
                  </div>
                  <span>部门</span>
                </div>
                <div style="height: 20px;background: #f2f2f2;"></div>
                <div class="select_department_list">
                    <ul>
                      <li v-for="(item,index) in department" :key="index" style="width:100%">
                          <p @click="selectDept(item)"><span>&nbsp;&nbsp;{{item.dept_name}}</span></p>
                      </li>
                  </ul> 
                </div>
              </mt-popup>
        </div>

        <div class="person_content">
            <div class="person_table">
                <table>
                    <thead>
                        <tr>
                          <th style="width:20vw;">ID</th>
                          <th style="width:20vw;">名称</th>
                          <th style="width:20vw;">MAC</th>
                          <th style="width:20vw;">手机号</th>
                          <th style="width:20vw;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="person in staffment">
                          <td style="width:20vw;">{{person.Id}}</td>
                          <td style="width:20vw;">{{person.name}}</td>
                          <td style="width:20vw;">{{person.s_mac}}</td>
                          <td style="width:20vw;">{{person.phone}}</td>
                          <td style="width:35vw;"><button @click="checkMac(person.s_mac)">查看轨迹</button></td>
                        </tr>
                    </tbody>
                </table>
                <mt-popup v-model="popupMap" position="left" class="mint-popup-3" :modal="false">
                <div class="select_department_top">
                  <div class="top_lf">
                    <div @click="quit" style="width:50px"> <返回 </div>
                  </div>
                  <span>带客轨迹</span>
                </div>
                <div style="height: 20px;background: #f2f2f2;"></div>
                <maps :option="optionMap"></maps>
              </mt-popup>
            </div>
        </div>

  </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui';
  import { passenger as passengerApi } from "../../config/request.js";
  export default {
    data() {
      return {
        case_filed_id: this.$route.query.case_filed_id,
        ticket: this.$store.state.ticket.ticket,
        areaTreeData: [],
        startTime: new Date().Format("yyyy-MM-dd"),
        endTime: new Date().Format("yyyy-MM-dd"),
        startData:new Date(),
        area_id:0,
        deptName:'部门',
        optionMap:[],
        department:[],
        popupDept:false,
        staffment:[],
        popupMap:false,
      }      
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
    },
    areaTree() {//小区域
      let option = { case_filed_id: this.case_filed_id, ticket: this.ticket };
      passengerApi.areaTree.call(this,option,data => {
          if (data.codeStatus != 200) {
            return Toast(data.codeMsg);
          }
          this.areaTreeData = data.data;
        },(err) => {console.info(err);}
      );
    },
    //获取部门信息
    getdepartment(){
      let option = {case_filed_id: this.case_filed_id};
      passengerApi.departmentManger.call(this,option ,data =>{
        this.department = data.data;
      }, (err) => {console.info(err);})
     },
     selectDept(dept){
       this.deptName=dept.dept_name;
       this.popupDept=false;
       this.getstaff(dept.Id);
     },
    getstaff(dept_id){
      let option = {
        case_filed_id: this.case_filed_id
        };       
      passengerApi.getstaff.call(this, dept_id,option, data => {
          this.staffment = data.data;
      }, (err) =>{console.info(err);})
    },
    checkMac(mac){
      this.popupMap=true;
       this.optionMap={popupMap:this.popupMap,mac:mac,start_date:this.startTime,end_date:this.endTime,area_id:this.area_id}
    },
    quit(){
      this.popupMap=false;
      this.optionMap={popupMap:this.popupMap};
    }
    },
    created() {
    },
    components:{
        "maps":resolve => require(['./maps.vue'], resolve),
    },
    mounted(){
     this.areaTree();
     this.getdepartment();
     this. getstaff(-1);
     this.moveDiv("picker-toolbar","picker-items");
    }
  }
</script>

<style lang="less" scoped>
.map_nav {
  display: flex;
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  span {
    font-size: 14px;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    width: 30vw;
    display: inherit;
  }
  select {
    width: 30vw;
    padding-right: 1vw;
    border: 1px solid #c5c5c5;
    margin-right: 1vw;
    height: 25px;
    margin-top: 3vw;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    font-size: 3.5vw;
    color: #424242;
  }
  button {
    height: 25px;
    width: 35vw;
    margin-top: 3vw;
    line-height: 0;
    font-size: 3.5vw;
    background-color: white;
    border: 1px solid #c5c5c5;
    border-radius: 0;
    label {
      font-size: 14px;
      color: #757575;
      font-family: '\5FAE\8F6F\96C5\9ED1';
    }
  }
}
.mint-popup-3 {
  width: 100%;
  height: 100%;
  background-color: #fff;
      }
.select_department_top{
  width: 100%;
  background-color: #FFFFFF;
  height: 49px;
  line-height: 49px;
  text-align: center;
  font-family: '\5FAE\8F6F\96C5\9ED1';
  border-bottom: 1px solid #F6F6F6;
  .top_lf{
    width: 10%;
    position: absolute;
    top: 0;
    left: 2%;
    font-size: 15px;
  }
  a{
    color:#333333;
  }
  span{
    line-height: 14px;
    font-size: 14px;
    font-style: normal;
  }
}
.map_top {
  display: flex;
  z-index: 999;
  width: 100%;
  height: 49px;
  margin-top: 46px;
  line-height: 49px;
  border-bottom: 3px solid #f2f2f2;
  ul{
    width:100%;
     li{
      display: inline-block;
      margin-left: 65%;
      text-align: right;
      width: 30vw;
      span{
        font-size: 14px;
        font-family: '\5FAE\8F6F\96C5\9ED1';
        color: #333333;
      }
    }
  }
}
.person_content{
  // margin-left: 10%;
  // height: 100%;
  width: 99.9vw;
  // width: 100%;
  // margin-top: 1%;
    span{
      font-size: 14px;
      font-family: '\5FAE\8F6F\96C5\9ED1';
      margin-left: 1%;
    }
}
.person_table{
    // width:100%;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    line-height: 18px;
    font-size: 18px;
    font-style: normal;
    color: #333333;
    table{
        border-spacing: 0;
        border-collapse: collapse;
        // width:100%;
         tr{
             height:40px;
         }
         thead{
            background-color: #ebeff2;
         }
         tbody{
            td{
                font-size: 4vw;
                padding: 5px;
                text-align: center;
                border:1px solid #e5e5e5;
                button{
                    padding:7px;
                    background-color:#fd2e4a;
                    color:#fefeff;
                    border: 0;
                    border-radius: 5px;
                }    
            }
            tr:nth-child(even){
                background: #f8f9fb;
            }
         }
    }

}
.select_department_list{
  ul{
    li{
      // width:100%;
      margin:0;
      text-align: left;
      border: 1px solid #eaeaea;
      height: 49px;
      line-height: 49px;
      p{
        margin:0;
      }
    }
  }
}
</style>

