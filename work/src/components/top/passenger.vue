<template>
  <div class="main">
        <div class="nav_list">
            <ul>
                <a class="nav_main" @click="main_top=true">
                  <img src="../../assets/img/nav_main.png">
                </a>
                <mt-popup v-model="main_top" position="left" class="main_menu">
                    <div class="menu_top">
                      <div class="menu_top_content">                        
                        <div class="menu_logo"><img src="../../assets/img/img_.png" style="width:76px"></div>
                        <div class="menu_txt">
                          <p>{{userName}}</p>
                          <p style="font-size:2.5vw;">欢迎来到营销数据服务平台</p>
                        </div>                      
                      </div>
                    </div>
                    <div class="menu_esc">
                      <img src="../../assets/img/menu_esc.png" style="width: 8%;" @click="quits">
                      <span @click="quits">退出</span>
                    </div>
                </mt-popup>
                
                 
                <li :class="{ active: pathP.indexOf($route.path)!=-1}" @click="Switch('passenger')">
                    <div ><em>营销数据分析</em>
                        <i :class="{'icon-arrowD':passenger,'icon-arrowT':!passenger}"></i>
                    </div>
                </li>
                <li :class="{ active: pathM.indexOf($route.path)!=-1 }"@click="Switch('mac')">
                    <div><em>后台管理</em>
                        <i :class="{'icon-arrowD':mac,'icon-arrowT':!mac}"></i>
                    </div>
                </li>
            </ul>
        </div>
        
        <mt-popup v-model="passenger" popup-transition="popup-fade"  style="top:50px;position: absolute;" class="mint-popup-2 mint-popup-top" :modal="false">
            <div class="second_nav">
              <ul>
                  <li  v-for="(item,index) in list"  :key="index" :class="{ activeS: item.path == $route.path }">
                      <router-link :to='{path:item.path}' @click.native="passenger=false">
                          <span>{{item.title}}</span>
                      </router-link>
                  </li>
              </ul>
          </div>
        </mt-popup>
        <div :class="{hide:!passenger,show:passenger}" @click="passenger=false" style="z-index: 999;position: absolute;left: 0;top: 50px;width: 100%;height: 100%;opacity: 0.5;background: #000;"></div>
      

        <mt-popup v-model="mac"  popup-transition="popup-fade" style="top:50px;position: absolute;" class="mint-popup-2 mint-popup-top" :modal="false">
            <div class="second_nav">
              <ul>
                  <li  v-for="(item,index) in person"  :key="index" :class="{ activeS: item.path == $route.path }">
                      <router-link :to='{path:item.path}' @click.native="mac=false">
                          <span>{{item.title}}</span>
                      </router-link>
                  </li>
              </ul>
          </div>
        </mt-popup>
        <div :class="{hide:!mac,show:mac}" @click="mac=false" style="z-index: 999;position: absolute;left: 0;top: 50px;width: 100%;height: 100%;opacity: 0.5;background: #000;"></div>
        <router-view></router-view>  
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import { passenger as passengerApi } from "../../config/request.js";
export default {
  data() {
    return {
      pathP: ["/today", "/passflow","/trajectory","/hot"],
      pathM:["/person","/manger"],
      passenger: false,
      portray: false,
      mac: false,
      main_top: false,
      userName:this.$store.state.user.userinfo.username,
      area_main: "",
      list_main: [],
      list_company: [],
      list_area: [],
      list: [
        {
          path: "/today",
          title: "每月数据"
        },
        {
          path: "/passflow",
          title: "数据分析"
        },
        {
          path: "/trajectory",
          title: "顾客信息"
        },{
          path: "/hot",
          title: "顾客热度图"
        }
      ],
      person:[{
          path: "/person",
          title: "人员管理"
        },{
          path: "/manger",
          title: "管理员工具"
        }]
    };
  },
  components: {
    today: resolve => require(["../passenger/today.vue"], resolve),
    passflow: resolve => require(["../passenger/passflow.vue"], resolve),
    hot: resolve => require(["../passenger/hot.vue"], resolve),
    trajectory: resolve => require(["../passenger/trajectory.vue"], resolve)
  },
  methods: {
    Switch(popup) {
      switch (popup) {
        case "passenger":
          this.passenger = true;
          this.portray = false;
          this.mac = false;
        //   console.log(this.$route)
          break;
        case "mac":
          this.passenger = false;
          this.portray = false;
          this.mac = true;
          break;
      }
    },
    //侧边栏列表状态改变
    change_status(status){
      switch(status){
        case "status":
          if(this.list_main.length>1){
            //列表伸缩
            this.status=!this.status;
          }
            //小图标样式变化
          this.status_=!this.status_;
          this.status1_=false;
          this.status2_=false;
          this.status1=false;
          this.status2=false;
          break;
        case "status1":
          if(this.list_company.length>1){
             this.status1=!this.status1;
          }
          this.status1_=!this.status1_;
           this.status_=false;
           this.status2_=false;
           this.status=false;
           this.status2=false;
          break;
        case "status2":
          if(this.list_area.length>1){
             this.status2=!this.status2;
          }
             this.status2_=!this.status2_;
            this.status1_=false;
            this.status_=false;
             this.status1=false;
            this.status=false;
          break;
      }
    },
    //侧边栏列表数据变化
    replace_main(main){
      // 切换列表
      this.main_main = main;
      this.list_company = Object.keys(this.permison[main]);
      this.list_area = this.permison[main][this.list_company[0]];

      // 切换默认显示
      this.company_main = this.list_company[0];
      this.area_main = this.list_area[0].case_name;
      this.case_filed_id = this.list_area[0].case_id;

      // 配置页面
     this.$router.push({path:'/reload',query:{case_filed_id:this.case_filed_id,pathHis:this.$route.path}});
    },
    replace_company(company){
      // 切换列表
      this.company_main = company;
      this.list_area = this.permison[this.main_main][company];

      // 切换默认显示
      this.area_main = this.list_area[0].case_name;
      this.case_filed_id = this.list_area[0].case_id;

      //配置页面
      this.$router.push({path:'/reload',query:{case_filed_id:this.case_filed_id,pathHis:this.$route.path}});
    },
    replace_area(area){
      this.case_filed_id=area.case_id;
      this.area_main = area.case_name;
      this.$router.push({path:'/reload',query:{case_filed_id:this.case_filed_id,pathHis:this.$route.path}});
    },
    //获取侧边栏数据
    list_main_data(){
      let userinfo = this.$store.state.user.userinfo.products[0];
          this.permison={};

          for (var i = 0; i < userinfo.permsion.length; i++) {
            let company = {},
                caseData = [];
              var element = userinfo.permsion[i];

              // 往案场数插入集团
              if (!this.permison[element.business_name]) {
                this.permison[element.business_name] = {};
              }

              // 往案场数插入公司
              if (!this.permison[element.business_name][element.company[0].company_name]) {
                this.permison[element.business_name][element.company[0].company_name] = [];
              }

              // 往案场树插入案场
              var ca_j = 1;
              if(this.permison[element.business_name][element.company[0].company_name].length){
                for(var j = 0; j < this.permison[element.business_name][element.company[0].company_name].length; j++){
                  if(this.permison[element.business_name][element.company[0].company_name][j].case_name == element.company[0].datapermsions[0].case_name){
                    ca_j = 0;
                    break;
                  }
                }
              }
              if(ca_j){
                this.permison[element.business_name][element.company[0].company_name].push({
                  case_name: element.company[0].datapermsions[0].case_name,
                  case_id: element.company[0].datapermsions[0].case_id
                });
              }
            }
          // for (var i = 0; i < userinfo.permsion.length; i++) {
          //     var element = userinfo.permsion[i];
          //     if(!this.permison[element.business_name]){
          //       this.permison[element.business_name]={};
          //     }
          //     if(!company[element.company[0].company_name]){
          //         company[element.company[0].company_name]=[];
          //         this.permison[element.business_name]=company
          //     }
          //     caseData.push({case_name:element.company[0].datapermsions[0].case_name,case_id:element.company[0].datapermsions[0].case_id})
          //     company[element.company[0].company_name]=caseData;
          // }

              this.list_main = Object.keys(this.permison);
              this.list_company = Object.keys(this.permison[this.list_main[0]]);
              this.list_area=this.permison[this.list_main[0]][this.list_company[0]];
              //初始化侧边栏列表数据    
              this.main_main=this.list_main[0];
              this.company_main= this.list_company[0];
              this.area_main=this.list_area[0].case_name;
              this.case_filed_id=this.list_area[0].case_id; 
        },
        quits(){
             this.$store.dispatch('remove_userinfo');
             Toast({
                    message: '注销成功',
                    duration : 1000
                    });
                setTimeout(function(){
                     return this.$router.push({path:'/login'});
                }.bind(this),1000) 
        },
  },
  created() {
    // Indicator.open({ spinnerType: "fading-circle" });
  },
  mounted() {
    // this.list_main_data();
    //  document.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
    //         //有遮罩层的时候就将滚动事件禁用
    //         if (main_top) {
    //             event.preventDefault();
    //         }
    //     });

  }
};
</script>

<style lang="less" >
@import "../../less/config";
.nav_list{
position: absolute;
background-color: #FFFFFF;
right: 0;
top: 0;
left: 0;
height: 49px;
line-height: 49px;
text-align: center;
font-family: '\5FAE\8F6F\96C5\9ED1';
border-bottom: 1px solid #F6F6F6;
ul {
  margin: 0;
  .nav_main{
    float:left;
    padding: 3px;
    width:5%;
    margin-left:3%;
      img{
        width:1.8em;
        height: 1.4em;
      }
  };      
  li {
    list-style: none;
    float: left;
    width: 45%;
    div {
      position: relative;
      display: block;
      text-decoration: none;
      color: @text;
      em {
        font-family: '\5FAE\8F6F\96C5\9ED1';            
        line-height: 14px;
        font-size: 14px;
        font-style: normal;
        color: #333333;
      }
      i{  
          font-size: 14px;
      }
    }
  }
  .active {
    i,
    em {
      font-family: '\5FAE\8F6F\96C5\9ED1';
      color: @main;
      font-style: normal;
    }
  }
 } 
}


//侧边栏主页
.main_menu{
        height: 100%;
        width: 86.666666%;
        background-color: #f1f2f4;
          .menu_top{
            width: 100%;
            height: 15vh;
            margin-top: 5vh;
            .menu_top_content{
              width:95%;
              height: 100%;
              margin: 0 auto;
                .menu_logo{
                  float: left;
                  width: 25%;
              };
                .menu_txt{
                  float: left;
                  width: 70%;
                  margin-left: 1%;
                    p{
                      font-family: '\5FAE\8F6F\96C5\9ED1';
                      line-height:1em;
                    }
                    p:first-child{
                      float: left;
                      font-size:18px;
                      margin-bottom: 2%;
                    }
                    p:last-child{
                      clear: both;
                      float: left;
                      font-size:10px;
                      color: #fd2e4a;
                    }  
                };
              }
            };
          .menu_content{
            width: 100%;
            // margin-top: 4vh;
            height:70vh;
            clear: both;
            .menu_content_main{
              width:100%;
              overflow:hidden;
              height:70vh;
              margin: 0 auto;
              text-align: left;
              .menu_content_comment{
                margin-left: 7%;
                height: 8vh;clear:both;
                .list_img{
                  padding: 2%;
                  float: left;
                }
                .list_company{
                  float: left;
                  margin-left: 10%; 
                  ul{
                    li{
                      width: 50vw;
                      font-size: 20px;
                      font-family: '\5FAE\8F6F\96C5\9ED1';
                      clear: both;
                      border-bottom:1px solid #c0c0c0;
                      list-style:none;
                        i{
                          float: right;
                          font-size: 20px;
                          margin-top: 8%;
                        }
                        .actice_i{
                          color: #fd2e4a;
                        }
                        ul{
                          max-height: 30vh;
                          -webkit-overflow-scrolling: touch;
                          clear: both;
                          overflow: scroll;
                          list-style: none;
                          li:active{
                            color:#fd2e4a;
                            border-bottom:1px solid #fd2e4a;
                            list-style: none;
                          }
                      }
                    }
                 }
                }
              }
              .menu_content_comment:after {display:block; height:0; content:""; clear:both;}                
            };
          };
          .menu_esc{
           position: absolute;
          left: 0;
          right: 0;
          bottom: 2vh;
          height: 8vh;
          width: 90%;
          text-align: left;
          margin-left: 10%;
            span{
              margin-left: 7%;
              font-size: 20px;
              font-family: '\5FAE\8F6F\96C5\9ED1';
              vertical-align: super;
              color: #333333;
            }
          }
};
::-webkit-scrollbar{width:0px}
.mint-popup-2 {
  width: 101%;
  height: auto;
  padding-bottom:20px;
  text-align: center;
  background-color: white;
  backface-visibility: hidden;
}
.second_nav {
  ul {
    li {
      height: 12vw;
      line-height: 12vw;
      width: 87vw;
      font-size: 3.2vw;
      color: #292929;
      margin: 0 auto;
      text-align: -webkit-left;
      border-bottom: 1px solid #f2f2f2;
      a {
        position: relative;
        display: block;
        text-decoration: none;
        color: @text;
        span {
          line-height: 14px;
          font-size: 14px;
          font-family: '\5FAE\8F6F\96C5\9ED1';
          font-style: normal;
        }
        i {
          font-size: 14px;
        }
      }
    }
    .activeS {
      a {
        color: #fd2a44;
        border-bottom: 1px solid #fd2a44;
      }
    }
  }
}
.hide{
  display:none;
}
.show{
  display: block;
}
</style>

