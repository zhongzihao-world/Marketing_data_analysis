<template>
  <div class="main">
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import axios from 'axios';
export default {
  data() {
    return {
      ticket:null,
    };
  },
  methods: {
    getCookie(name) {
      var m = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]*)(;|$)")
      );
      return !m ? "" : unescape(m[2]);
    },
    IsLogin(){
        // this.ticket=this.getCookie('SSO');
        // this.ticket=this.getCookie('ssoSample');
        // this.ticket= '2742ecbc-b3bd-422f-9eff-47c39f009411';
        // //判断是否切换用户
        // if(this.$store.state.ticket.ticket!=this.ticket){
        //  //ticket存仓库
        //   this.$store.dispatch('update_ticket', {ticket:this.ticket});
        //   //验证ticket
        //   let postUrl=`http://sso.datacohesion.cn/auth/authTicket?ticket=${this.ticket}`;
        //   axios.get(postUrl).then((data) => {
        //     if(data.data.codeStatus!=200){
        //       Toast('ticket出错，请重新登录');
        //       return window.location.href =" http://sso.datacohesion.cn/auth/pLogin?ptourl=http://m.datacohesion.cn/weixincctv2/#/home"; 
        //     }
        //     let userinfo=data.data.data.userinfo;
        //     //权限信息存仓库
        //      this.$store.dispatch('update_userinfo', {userinfo:userinfo}).then(() => {
        //      return this.$router.push({path:'/today',query:{case_filed_id:userinfo.products[0].permsion[0].company[0].datapermsions[0].case_id}});
        //      })
        //   }).catch((err)=>{
        //      return Toast('发生错误，请重试\n' + err);
        //   });
        // }
        return  this.$router.push({path:'/today'})
    }
  },
  created() {},
  mounted() {
    this.IsLogin();
  }
};
</script>

<style lang="less" scoped>

</style>

