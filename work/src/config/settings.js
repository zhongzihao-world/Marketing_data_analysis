import { Toast } from 'mint-ui';
// 全局设置
const gbs = {
    host: 'http://api.datacohesion.cn/', //接口根地址
    db_prefix: 'webapp_', //本地存储的key
};

// 回调
const cbs = {
    /**
     ** ajax请求成功，返回的状态码不是200时调用
     ** @param  {object} err 返回的对象，包含错误码和错误信息
     **/
    statusError(err) {
        if (err.status !== 404) {
            Toast(err.msg);
        } else {
            this.$store.dispatch('remove_userinfo').then(() => {
                Toast(err.status + ',' + err.msg + '！');
            });
        }
    },

    /**
     * ajax请求网络出错时调用
     */
    requestError(err) {
        Toast('请求错误：' + err.response.status + ',' + err.response.statusText);
    }
}


export {
    gbs,
    cbs
}