<template>
  <div class="scroll-wrapper" :style="{height:height1+'px'}">
   <iframe id="yu-iframe" :src="iframsrc" width="100%" :height="height" scrolling="auto" frameborder="0"></iframe>
  </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui'
  export default {
    data() {
      return {
        iframsrc:'',
         case_filed_id: this.$route.query.case_filed_id,
         height:document.documentElement.clientHeight-50,
         height1:document.documentElement.clientHeight
      }
      
    },
    created() {
    },
    mounted(){
      this.iframsrc=`http://test.datacohesion.cn/salesAnalysis/v1/visual/portrayal_guide.do?acCode=${this.case_filed_id}`;
    }
  }
</script>

<style lang="less" scoped>
 .scroll-wrapper {  
    -webkit-overflow-scrolling: touch;  
    overflow-y: scroll; 
    position: absolute;
    left: 0;
    right: 0;
    top:50px; 
}  
</style>

