<template>
  <div style="width:100%;height:100%;">
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button @click="login">登录</button>
      <span class="link" @click="toRegister">没有账号？马上注册</span>
    </div>
    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="password" placeholder="请输入密码" v-model="newPassword">
      <input type="password" placeholder="请确认密码" v-model="conPassword">
      <button v-on:click="register">注册</button>
      <span class="link" v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { passenger as passengerApi } from "../config/request";
  export default{
    data(){
      return{
        showLogin: true,
        showRegister: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        conPassword: '',
      }
    },
    mounted(){
        
    },
    methods: {
      login(){
        if(this.username == "" || this.password == ""){
          Toast({
                message: '请输入账号或者密码！',
                duration : 1500
            });
        }else{
          let option = {
              username:this.username,
              password:this.password
              }
            passengerApi.login.call(
                this,
                option,
                data => {
                    if(!data.code){
                        Toast({
                            message: '登录成功',
                            duration : 1000
                            });
                            console.log(data)
                        let userinfo = {
                            username: data.data[0].username,
                            password: data.data[0].password,
                            role: data.data[0].role
                        }    
                        setTimeout(function(){
                            //用户信息存仓库
                        this.$store.dispatch('update_userinfo', {userinfo: userinfo});    
                        this.$router.push('/today')
                        }.bind(this),1000)
                    }else{
                        Toast({
                            message: '请输入正确的用户名和密码!',
                            duration : 1000
                        });
                    }
                },
                () => {
                console.info("网络繁忙，请求失败！");
                }
            );
        }
      },
      toRegister(){
        this.showRegister = true;
        this.showLogin = false;
      },
      register(){
        if(this.newUsername == "" || this.newPassword == "" || this.conPassword == ""){
          Toast({
                message: '请输入账号或者密码！',
                duration : 1500
            });
        }else if(this.newUsername.length<6){
            Toast({
                message: '用户名必须大于6个字符！',
                duration : 1000
            });
        }else if(this.newPassword.length<6){
            console.log(this.newPassword.length)
            Toast({
                message: '密码长度必须大于6！',
                duration : 1000
            });
        }else if(this.conPassword!=this.newPassword){
            Toast({
                message: '两次输入的密码不一致！',
                duration : 1000
            });
        }else{
          let option = {
              username: this.newUsername,
              password: this.newPassword
            }
              passengerApi.register.call(
                this,
                option,
                data => {
                    console.log(data)
                    if(data.exit){
                         Toast({
                        message: '该用户名已被注册！',
                        duration : 1000
                        });
                    }else{
                        Toast({
                        message: '注册成功！',
                        duration : 1000
                        });
                        this.username = ''
                        this.password = ''
                        setTimeout(function(){
                        this.showRegister = false
                        this.showLogin = true
                        }.bind(this),1000)
                    }
                    
                },
                () => {
                console.info("网络繁忙，请求失败！");
                }
            );
        }
      },
      ToLogin(){
        this.showRegister = false
        this.showLogin = true
      }
    }
  }
</script>

<style lang="less" scoped >
.login-wrap,.register-wrap{
    text-align: center;
    position: absolute;
    top: 25%;
    left: 16%;
}
h3{
    margin: 10px auto 20px
}
input{
    display:block; 
    width:250px; height:40px; 
    line-height:40px; margin:0 auto; 
    margin-bottom: 20px; 
    outline:none; 
    border:1px solid #888; 
    padding:10px; 
    box-sizing:border-box;
}
p{
    color:red;
}
button{
    display:block; 
    width:250px; 
    height:40px; 
    line-height: 40px; 
    margin:0 auto; 
    border:none; 
    background-color:#41b883; 
    color:#fff; 
    font-size:16px; 
    margin-bottom:5px;
}
span{
    cursor:pointer;
}
span:hover{
    color:#41b883;
}
.link{
    text-decoration: underline
}
</style>
