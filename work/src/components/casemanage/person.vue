<template>
      <div>
          <div class="person">
              <ul>
                <li><span>&nbsp;&nbsp;人员管理</span></li>
                <li @click="popupDept=true">{{dempname}}<span>&nbsp;></span></li>
              </ul>
          </div>
       
        <div class="person_content">
            <div class="content_top"><span>员工信息</span></div>
            <div class="person_table" @click="personDetail">
                <table>
                    <thead>
                        <tr>
                          <th>姓名</th>
                          <th>年龄</th>
                          <th>手机</th>
                          <th>部门</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="person in person">
                          <td style="width:10vw;">{{person.staff}}</td>
                          <td style="width:30vw;">{{person.age}}</td>
                          <td style="width:30vw;">{{person.telphone}}</td>
                          <td style="width:30vw;">{{person.department}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 切换部门弹窗 -->
        <mt-popup v-model="popupDept" position="left" class="mint-popup-3" :modal="false">
          <div style='overflow-x: hidden;'>
            <div class="select_department_top">
                <div class="top_lf">
                  <a @click="popupDept=false"><返回</a>
                </div>
                <span>部门</span>
            </div>

            <div class="select_department">
              <ul>
                <li><a  @click="department_add()">添加部门</a></li>
              </ul>
            </div>

            <div class="select_department_list">
                <ul>
                    <li v-for="dpm in department">
                        <a @click="changeDept(dpm)"><span>&nbsp;&nbsp;{{dpm.department}}</span></a>
                        <a @click="department_change(dpm)"><img src="../../assets/img/department_edit.png" style="width:20px;"></a>                 
                        <a @click="department_delete(dpm)"><img src="../../assets/img/department_delete.png" style="width:20px;"></a>
                    </li>
                </ul> 
            </div>
          </div> 
        </mt-popup>
        <!-- 详情弹窗 -->
        <mt-popup v-model="popupDepart" position="left" class="mint-popup-3" :modal="false">
                <div>
                  <div class="department_top">
                      <div class="top_lf">
                        <a @click="popupDepart=false"><span><</span>返回</a>
                      </div>
                      <span>员工信息</span>
                  </div>

                  <div class="department_picktime">
                    <ul>
                      <li><span>&nbsp;&nbsp;{{dempname}}</span></li>
                      <li><a @click="staff_add_model=true">添加员工</a></li>
                    </ul>
                  </div>
                  <!-- 自定义 增加员工信息 -->
                  <mt-popup v-model="staff_add_model" position="top" class="staff_add_main">
                    <div class="staff_add_content">
                      <div class="staff_add_message">添加员工</div>
                      <div class="staff_add_input">
                        <span>姓名</span><input placeholder="" type="text" v-model="input_name"> 
                        <div class="staff_add_errormsg" style="visibility: hidden;"></div>    
                      </div>
                      <div class="staff_add_input">
                        <span>年龄</span><input placeholder="" type="text" v-model="input_age"> 
                        <div class="staff_add_errormsg" style="visibility: hidden;"></div>    
                      </div>
                      <div class="staff_add_input">
                        <span>手机号</span><input placeholder="" type="text" v-model="input_phone"> 
                        <div class="staff_add_errormsg" style="visibility: hidden;"></div>    
                      </div>
                    </div>
                    <div class="staff_add_bottom">
                      <button class="staff_add_cancle" @click="staff_add_model=false">取消</button>
                      <button class="staff_add_confirn" @click="addstaff()">确定</button>
                    </div>
                  </mt-popup>

                  <div class="department_content">
                        <div class="department_table">
                              <table style="overflow: scroll;">
                                  <thead>
                                      <tr>
                                        <th>id</th>
                                        <th>姓名</th>
                                        <th>年龄</th>
                                        <th>手机号</th>
                                        <th>部门</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="dpm_ in person">
                                        <td>{{dpm_.id}}</td>
                                        <td>{{dpm_.staff}}</td>
                                        <td>{{dpm_.age}}</td>
                                        <td>{{dpm_.telphone}}</td>
                                        <td>{{dpm_.department}}</td>
                                      </tr>
                                  </tbody>
                               </table>
                        </div>
                  </div>
                
                </div>
        </mt-popup>
      </div>   
</template>

<script>
  import { Toast, Indicator,MessageBox } from 'mint-ui';
  import { passenger as passengerApi } from "../../config/request.js";
  export default {
    data() {
      return {
        case_filed_id: this.$route.query.case_filed_id,
        person: [],
        popupDept:false,
        dempname:'',
        department:[],
        popupDepart:false,
        input_name: "",
        input_age: "",
        input_phone: "",
        staff_add_model: false,
      }      
    },
    methods: {
      //获取员工信息
      getstaff(){
        let option = {
            dept_id: this.dept_id
          };
        passengerApi.getstaff.call(this,option, data => {
            console.log(data.data)
            this.person = data.data;
        }, () =>{console.info("网络繁忙，请求失败！");})
      },
      personDetail(){
          this.popupDepart=true;
      },
       //删除部门
      department_delete(dpm) {
          MessageBox.confirm('', {
                message: '确认删除此部门？',
                title: '提示',
                cancelButtonClass:'cancelButton',
                confirmButtonClass:'confirmButton',
                cancelButtonText: '取消',
                confirmButtonText: '确定',
            }).then( action  => {
              let option = {id: dpm.dept_id};
                passengerApi.deletedepartment.call(this,option, data =>{
                    if(data.code){
                          console.log(data.message);
                        }else{
                          this.getdepartment();                          
                          Toast({message: '操作成功!', duration: '1000'});
                        }  
                }, () =>{console.info("网络繁忙，请求失败!!");})    
            }).catch(err => {})
        },

      //增加部门      
      department_add() {
          MessageBox.prompt('',{
                message: '请输入部门',
                cancelButtonClass:'cancelButton',
                confirmButtonClass:'confirmButton',
                cancelButtonText: '取消',
                confirmButtonText: '确定',
          }).then(({value,action}) => {
              if(!value){
                  Toast("请输入正确的部门!")
              }else{  
                  let option = {
                    dept_name: value,
                    };
                  passengerApi.adddepartment.call(this, option, data =>{
                      if(data.code){
                        console.log(data.message);
                      }else{
                        Toast({message: '操作成功!', duration: '1000'});
                        this.getdepartment();
                      }                      
                  }, () =>{console.info("网络繁忙，请求失败!!");})
              }              
          }).catch(err => {});
          //改变组件样式
            this.$nextTick(()=>{
            var tr = document.getElementsByTagName("input");
            for (let index = 0; index < tr.length; index++) {
                const element = tr[index];
                element.style.height="26px";
            }
            var btn=document.getElementsByClassName('confirmButton')[0];
                btn.style.fontSize="15px";
            var btnCancle=document.getElementsByClassName('cancelButton')[0];
                btnCancle.style.fontSize="15px";
            })
           
        },
      //修改部门名字
      department_change(dpm) {
          MessageBox.prompt('',{
                message: '请输入新的部门名字',
                cancelButtonClass:'cancelButton',
                confirmButtonClass:'confirmButton',
                cancelButtonText: '取消',
                confirmButtonText: '确定',
          }).then(({value,action}) => {
              if(!value){
                 Toast("请输入正确的部门!")  
              }else{
                  let option = {
                    id: dpm.dept_id,
                    name: value,
                    };
                  passengerApi.changedepartment.call(this, option , data =>{
                      if(data.code){
                            console.log(data.message);
                          }else{
                            this.getdepartment();
                            Toast({message: '操作成功!', duration: '1000'});
                          }
                  }, () => {console.info("网络繁忙，请求失败！");})
                }
          }).catch(err => {})
      },
      //增加员工
      addstaff(){
        if(this.input_name == ''|| this.input_mac == ''|| this.input_phone == ''){
          Toast({message: '请输入正确的信息!', duration: '1500', position: 'top'});          
        }else{
            let option = {
                dept_id: this.dept_id,
                department: this.dempname,
                input_name: this.input_name,
                input_age: this.input_age,
                input_phone: this.input_phone,
              };
            passengerApi.addstaff.call(this, option, data => {  
                this.staff_add_model=false;
                this.getstaff();
                Toast({message: '操作成功!', duration: '1000'});            
            }, () =>{console.info("网络繁忙，请求失败！");})
        }       
      },
      //获取部门信息
      getdepartment(){
        // Indicator.open({ spinnerType: "fading-circle" });
        let option = {};
        passengerApi.getdepartment.call(this,option ,data =>{
            console.log(data)
          this.department = data.data;
          this.dempname=data.data[0].department;
          this.dept_id=data.data[0].dept_id;
          this.getstaff();
          // Indicator.close();
        }, () => {console.info("网络繁忙，请求失败！");})
      },
      changeDept(dpm){
          console.log(dpm)
        this.popupDept=false;
        this.dempname=dpm.department;
        this.dept_id=dpm.dept_id;
        this.getstaff();
      }


    },
    created() {
    },
    mounted(){
      this.getdepartment();
    }
  }
</script>

<style lang="less" scoped>
.person {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 49px;
  z-index: 999;
  // width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  ul{
    width:100%;
     li{
      display: inline-block;
      span{
        font-size: 14px;
        font-family: '\5FAE\8F6F\96C5\9ED1';
      }
      width: 30vw;
    }
    li:last-child{
      margin-left: 35%;
      text-align: right;
      color: #FD2A44; 
    }    
  }
}

.mint-popup-3 {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.person_content{
  margin-top:98px;
  // float: right;
  height: 100%;
  width: 100%;
  .content_top{
      padding:3% 0;
    span{
      font-size: 14px;
      font-family: '\5FAE\8F6F\96C5\9ED1';
      margin-left: 1%;
    }
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
        width: 100%;
         tr{
             height:40px;
         }
         thead{
            background-color: #ebeff2;
         }
         tbody{
            td{
                font-size: 14px;
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
.select_department_top{
    width: 100%;
    background-color: #FFFFFF;
    height: 49px;
    line-height: 49px;
    text-align: center;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    border-bottom: 1px solid #F6F6F6;
    .top_lf{
      // width: 15vw;
      position: absolute;
      top: 0;
      left: 2%;
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
.select_department { 
  display: flex;
  z-index: 999;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  ul{
    width:100%;
     li{
      display: inline-block;
      font-size: 14px;
      font-family: '\5FAE\8F6F\96C5\9ED1';
      width: 30vw;
      margin-left: 80%;
    }
      a{
        background-color: #fd2e4a;
        padding:7px;
        border-radius: 5px;
        font-size: 14px; 
        color: #fffffd;
      }
  }
}
.select_department_list{
    display: flex;
    z-index: 999;
    width: 100%;
    line-height: 49px;
    background: #ffffff;
    ul{
        width: 100%;
        li{
            width: 100%;
            display: block;
            border: 1px solid #eaeaea;
            height: 49px;
            padding: 1% 0;           
            a{
                float: right;
                height: 24px;
                margin: 8px 5% 0 0;
            }
            a:first-child{
                float: left;
                margin: 0;
                width: 75vw;
                height: 49px;
                span{
                font-family: '\5FAE\8F6F\96C5\9ED1';
                font-size: 14px;
                font-style: normal;
                color: #333333;
                }
            }
        }
        li a:hover{
            span{
            color:#fd2e4a;
            }
        }
    }
}
.cancelButton{
    color: #b4b4b4;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    line-height: 14px;
    font-size: 14px;
    font-style: normal;
}
.confirmButton{
    color: #fb2f4a;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    line-height: 14px;
    font-size: 14px;
    font-style: normal;
}
.department_top{
    width: 100%;
    background-color: #FFFFFF;
    height: 49px;
    line-height: 49px;
    text-align: center;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    border-bottom: 1px solid #F6F6F6;
    .top_lf{
      // width: 10%;
      position: absolute;
      top: 0;
      left: 2%;
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
.department_picktime { 
  display: flex;
  left: 0;
  right: 0;
  top: 49px;
  z-index: 999;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: #f2f2f2;
  ul{
    width:100%;
     li{
      display: inline-block;
      font-size: 14px;
      font-family: '\5FAE\8F6F\96C5\9ED1';
      width: 30vw;
    }
    li:last-child{
      margin-left: 35%;
      text-align: right;
      a{
        background-color: #fd2e4a;
        padding:7px;
        border-radius: 5px;
        font-size: 14px; 
        color: #fffffd;
      }
    }    
  }
}
.department_content{
  height: 100%; 
  // width: 100%;
  overflow: scroll;
  .content_top{
      padding:3% 0;
    span{
      font-size: 14px;
      font-family: '\5FAE\8F6F\96C5\9ED1';
      margin-left: 1%;
    }
  }
}
.department_table{
    width:100%;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    line-height: 18px;
    font-size: 18px;
    font-style: normal;
    color: #333333;
    table{
        border-spacing: 0;
        border-collapse: collapse;
        width:100%;
         tr{
             height:40px;
         }
         thead{
            background-color: #ebeff2;
         }
         tbody{
            td{
                font-size: 14px;
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
.staff_add_main{
    position: fixed;
    top: 45%;
    left: 52%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 70%;
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
    .staff_add_content{
      padding: 10px;
      border-bottom: 1px solid #ddd;
      min-height: 36px;
      position: relative;
      .staff_add_message{
        color: #323232;
        margin: 0;
        text-align: center;
        line-height: 36px;
      }
      .staff_add_input{
        padding-top: 0px;
        span{
          font-family: '\5FAE\8F6F\96C5\9ED1';
          line-height: 28px;
          font-size: 14px;
          font-style: normal;
          color: #323232;
          margin-left:3%;
        }
        input{
          border: 1px solid #dedede;
          border-radius: 2px;
          padding: 5px 5px;
          width: 70%;
          float: right;
          height:26px;
          outline: none;
        }
        input:focus{
          border:1px solid #fe6579;
        }
        .staff_add_errormsg{
          color: red;
          font-size: 12px;
          min-height: 18px;
        }
      }
    }
    .staff_add_bottom{
      display: flex;
      height: 40px;
      line-height: 40px;
      .staff_add_cancle{
        color: #b4b4b4;
        background-color: #ffffff;
        font-family: '\5FAE\8F6F\96C5\9ED1';
        line-height: 14px;
        font-size: 15px;
        font-style: normal;
        border:0;
        width: 50%;
       border-right: 1px solid #dfdfdf;
      }
      .staff_add_confirn{
        color: #fe3c57;
        background-color: #ffffff;
        font-family: '\5FAE\8F6F\96C5\9ED1';
        line-height: 14px;
        font-size: 15px;
        font-style: normal;
        width: 50%;
        border:0;
        // border-top: 1px solid #dfdfdf;
      }
    }
}
</style>

