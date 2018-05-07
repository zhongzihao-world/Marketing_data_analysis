import {store} from '../../util/';

export default {
	//存储用户信息
	userinfo: store.get('userinfo') || {}
};