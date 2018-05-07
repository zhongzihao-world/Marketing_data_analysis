import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

// 导入封装的回调函数
import { cbs, gbs } from '../../config/settings.js';

//引入吐司


// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = gbs.host;

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {Function} errFn     错误回调函数
 */
export default function(type, url, data, fn, errFn) {
    if (type === 'get' || type === 'delete') {
        var datas = { params: data };
    } else {
        var datas = data;
    }

    Vue.axios[type](url, datas).then((res) => {
        fn(res.data);
    }).catch((err) => {
        errFn && errFn(err);
    });

};