<template>
    <div style="margin-top:49px;height: 100%;width: 100%;overflow: scroll;">
        <div class="person">
              <ul>
                <!-- <li><span>&nbsp;&nbsp;账号管理</span></li> -->
                <li >管理员:&nbsp;&nbsp;<span>{{username}}</span></li>
              </ul>
        </div>
        <div class="manger">
            <table>
                <thead>
                    <tr>
                        <th style="width:30vw;">账号名</th>
                        <th style="width:20vw;">密码</th>
                        <th style="width:20vw;">管理员性质</th>
                        <th style="width:30vw;">操作</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="userdata">
            <table>
                <tbody>
                    <tr v-for="_data in user_data">
                        <td style="width:30vw;">{{_data.username}}</td>
                        <td style="width:20vw;" >{{_data.password}}</td>
                        <td style="width:20vw;" >
                            {{_data.role?'超级管理员':'普通用户'}}
                        </td>
                        <td style="width:30vw;">
                            <a @click="change_password(_data)"><img src="../../assets/img/department_edit.png" style="width:20px;"></a>                 
                            <a @click="user_delete(_data)"><img src="../../assets/img/department_delete.png" style="width:20px;"></a>
                        </td>
                    </tr>
                </tbody>   
            </table>
        </div>
    </div>
</template>

<script>
  import { Toast, Indicator,MessageBox } from 'mint-ui';
  import { passenger as passengerApi } from "../../config/request.js";
  export default {
    data() {
      return {
          username: this.$store.state.user.userinfo.username,
          user_data: '',
      }     
    },
   methods:{
       getdata(){
           passengerApi.manger.call(
                this,
                this.$store.state.user.userinfo.username,
                data => {
                    if (data.code) {
                        return Toast('获取信息失败');
                    }
                    this.user_data = data.data
                },
                () => {
                console.info("网络繁忙，请求失败！");
                }
            );
       },
       change_password(_data){
           MessageBox.prompt('',{
                message: '请输入新密码',
                cancelButtonClass:'cancelButton',
                confirmButtonClass:'confirmButton',
                cancelButtonText: '取消',
                confirmButtonText: '确定',
          }).then(({value,action}) => {
              if(!value){
                 Toast("请输入新密码!")  
              }
              if(value.length<6){
                 Toast("新密码的长度必须大于6!")  
              }if(value.length>16){
                 Toast("新密码的长度不能大于16!")  
              }else{
                  let option = {
                    username: _data.username,
                    password: value,
                    };
                    console.log(option)
                  passengerApi.changepassword.call(this, option , data =>{
                      if(data.code){
                            console.log(data.message);
                          }else{
                            this.getdata();
                            Toast({message: '操作成功!', duration: '1000'});
                          }
                  }, () => {console.info("网络繁忙，请求失败！");})
                }
          }).catch(err => {})
       },
       user_delete(_data){
           if(!this.$store.state.user.userinfo.role){
               Toast({
                   message: '您还没有足够的权限!!', 
                   duration: '1000'
                });
           }else{
               MessageBox.confirm('', {
                message: '确认删除此管理员账号？',
                title: '提示',
                cancelButtonClass:'cancelButton',
                confirmButtonClass:'confirmButton',
                cancelButtonText: '取消',
                confirmButtonText: '确定',
            }).then( action  => {
              let option = {
                  username: _data.username
                  };
                passengerApi.userdelete.call(this,option, data =>{
                    if(data.code){
                          console.log(data.message);
                    }else{
                          this.getdata();                          
                          Toast({message: '操作成功!', duration: '1000'});
                    }  
                }, () =>{console.info("网络繁忙，请求失败!!");})    
            }).catch(err => {})
           }
           
       },
   },
    created() {
    },
    mounted(){
        this.getdata();
        console.log(this.$store.state)
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
            span{
                color: #FD2A44; 
            }
            margin-left: 2%;
            text-align: left;
        // color: #FD2A44;
        }    
    }

} 
.manger{
    width:100%;
    margin-top: 49px;
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
.userdata{
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
                a{
                    margin-left: 10%;
                }
            }

            tr:hover {
                background: #eeeeee;
                color:#333333;
            }
         }
    }

} 
</style>

