<template>
  <div>
  </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui'
  export default {
    data() {
      return {
        case_filed_id: this.$route.query.case_filed_id,
        path:this.$route.query.pathHis,
       }      
    },
  
    methods: {
     
    },
    created() {
         Indicator.open({ spinnerType: "fading-circle" });
    },
    mounted(){
        setTimeout(() => {
            Indicator.close();
            this.$router.push({path:this.path,query:{case_filed_id:this.case_filed_id}});
            }, 300);
    }
  }
</script>

<style lang="less">
 
</style>

