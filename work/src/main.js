import Vue from 'vue'
import App from './App'
import './assets/css/common.css'
import './less/common.less'

//时间控件样式改变
Vue.prototype.moveDiv = function(id_1, id_2) {
    var insert = function(nodeInsert, nodeTo) {
        if (nodeInsert.insertAdjacentElement) {
            nodeTo.insertAdjacentElement('beforeBegin', nodeInsert);
        } else {
            nodeTo.parentNode.insertBefore(nodeInsert, nodeTo);
        }
    }
    var obj = document.createElement("a");
    var t1 = document.getElementsByClassName(id_1)[0];
    t1.style.border = 0;
    var t2 = document.getElementsByClassName(id_2)[0];
    var t3 = document.getElementsByClassName("mint-datetime-action")[1];
    t3.style.color = "red";
    t3.style.border = "1px solid #ccc";
    t3.style.backgroundColor = "#FD2E4A";
    t3.style.color = "white";
    t3.style.width = "30vw";
    t3.style.marginRight = '27vw';
    t3.style.borderRadius = "2vw";
    t3.style.marginTop = "5vw";
    insert(obj, t2);
    insert(t2, t1);
    insert(t1, obj);
};

//mint-ui
import { Toast, Spinner, Cell, Navbar, TabItem, TabContainer, Loadmore, TabContainerItem, Picker, Popup, Button, DatetimePicker, MessageBox } from 'mint-ui';
Vue.component(Spinner.name, Spinner);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Cell.name, Cell);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Loadmore.name, Loadmore);

// // router
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

// vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//字体
import './assets/css/style.css'

//vuex store
import store from './store/'

// import routes from './config/router.js'

// echarts 柱状图
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
require('echarts/theme/macarons');

import './plugins/'

import { scrollRecord } from './libs/route-data' //滚动
Vue.directive('scroll-record', scrollRecord);




import commons from './components/common/' //注册公共组件

Object.keys(commons).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
    Vue.component(`v${name}`, commons[key])
})

Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



// router
import routes from './config/router.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    // mode: 'history',
    routes
})
// 记录路由改变的次数，避免页面刷新后，又进入
var IS_ROUTER_FIRST_CHANGE = true

router.beforeEach((to, from, next) => {
    let direction = 'slide-fade';


    // 上一个页面是否是返回？
    if (!!from.meta.goback) {
        // 如果两个页面都有callback，比较路由深度
        if (!!to.meta.goback) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            direction = toDepth >= fromDepth ? 'slide-right' : 'slide-left'
        } else {
            direction = 'slide-left'
        }
    } else {
        // 下个页面是否是返回？
        direction = !!to.meta.goback ? 'slide-right' : 'slide-fade'
    }

    if (IS_ROUTER_FIRST_CHANGE) {
        IS_ROUTER_FIRST_CHANGE = !IS_ROUTER_FIRST_CHANGE
        direction = 'slide-fade'
    }
    router.app.pageTransition = direction

    next()
})



const app = new Vue({
    el: '#app',
    data() {
        return {

        };
    },
    router,
    store,
    render: h => h(App)
})