import {
    ajax
} from '../util/'
//const ajax = require('../util/ajax/ajax.js')

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */


//设备
const passenger = {
    // 本地测试
    // login(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://localhost:9000/login/login", data, fn, errFn);
    // },
    // register(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://localhost:9000/login/register", data, fn, errFn);
    // },
    // todaydata(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/today/today", data, fn, errFn);
    // },
    // customerinfo(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/customerinfo/select", data, fn, errFn);
    // },
    // getdepartment(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/department/select_dept", data, fn, errFn);
    // },
    // getstaff(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/department/select_staff", data, fn, errFn);
    // },
    // addstaff(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://localhost:9000/department/add_staff", data, fn, errFn);
    // },
    // adddepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http:/localhost:9000/department/add_department", data, fn, errFn);
    // },
    // deletedepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://localhost:9000/department/department_delete", data, fn, errFn);
    // },
    // changedepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://localhost:9000/department/department_change", data, fn, errFn);
    // },
    // calculate(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/calculate/calculate_data", data, fn, errFn);
    // },
    // calculateperson(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/calculate/calculate_persondata", data, fn, errFn);
    // },
    // manger(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/manger/get_manger", data, fn, errFn);
    // },
    // changepassword(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://localhost:9000/manger/change_password", data, fn, errFn);
    // },
    // userdelete(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://localhost:9000/manger/user_delete", data, fn, errFn);
    // },
    // customer(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/customerhot/customer", data, fn, errFn);
    // },
    // customerdata(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://localhost:9000/customerhot/customerdata", data, fn, errFn);
    // },

    // // 服务器
    // login(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/login/login", data, fn, errFn);
    // },
    // register(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/login/register", data, fn, errFn);
    // },
    // todaydata(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/today/today", data, fn, errFn);
    // },
    // customerinfo(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/customerinfo/select", data, fn, errFn);
    // },
    // getdepartment(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/department/select_dept", data, fn, errFn);
    // },
    // getstaff(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/department/select_staff", data, fn, errFn);
    // },
    // addstaff(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/department/add_staff", data, fn, errFn);
    // },
    // adddepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/department/add_department", data, fn, errFn);
    // },
    // deletedepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/department/department_delete", data, fn, errFn);
    // },
    // changedepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/department/department_change", data, fn, errFn);
    // },
    // calculate(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/calculate/calculate_data", data, fn, errFn);
    // },
    // calculateperson(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/calculate/calculate_persondata", data, fn, errFn);
    // },
    // manger(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/manger/get_manger", data, fn, errFn);
    // },
    // changepassword(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/manger/change_password", data, fn, errFn);
    // },
    // userdelete(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://193.112.112.22:9000/manger/user_delete", data, fn, errFn);
    // },
    // customer(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/customerhot/customer", data, fn, errFn);
    // },
    // customerdata(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://193.112.112.22:9000/customerhot/customerdata", data, fn, errFn);
    // },


    // 本地测试
    login(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/login/login", data, fn, errFn);
    },
    register(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/login/register", data, fn, errFn);
    },
    todaydata(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/today/today", data, fn, errFn);
    },
    customerinfo(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/customerinfo/select", data, fn, errFn);
    },
    getdepartment(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/department/select_dept", data, fn, errFn);
    },
    getstaff(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/department/select_staff", data, fn, errFn);
    },
    addstaff(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/department/add_staff", data, fn, errFn);
    },
    adddepartment(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/department/add_department", data, fn, errFn);
    },
    deletedepartment(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/department/department_delete", data, fn, errFn);
    },
    changedepartment(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/department/department_change", data, fn, errFn);
    },
    calculate(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/calculate/calculate_data", data, fn, errFn);
    },
    calculateperson(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/calculate/calculate_persondata", data, fn, errFn);
    },
    manger(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/manger/get_manger", data, fn, errFn);
    },
    changepassword(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/manger/change_password", data, fn, errFn);
    },
    userdelete(data, fn, errFn) {
        ajax.call(this, 'post', "http://192.168.23.1:9000/manger/user_delete", data, fn, errFn);
    },
    customer(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/customerhot/customer", data, fn, errFn);
    },
    customerdata(data, fn, errFn) {
        ajax.call(this, 'get', "http://192.168.23.1:9000/customerhot/customerdata", data, fn, errFn);
    },
    
    //答辩地址                                                                                                        
    // login(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/login/login", data, fn, errFn);
    // },
    // register(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/login/register", data, fn, errFn);
    // },
    // todaydata(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/today/today", data, fn, errFn);
    // },
    // customerinfo(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/customerinfo/select", data, fn, errFn);
    // },
    // getdepartment(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/department/select_dept", data, fn, errFn);
    // },
    // getstaff(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/department/select_staff", data, fn, errFn);
    // },
    // addstaff(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/department/add_staff", data, fn, errFn);
    // },
    // adddepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/department/add_department", data, fn, errFn);
    // },
    // deletedepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/department/department_delete", data, fn, errFn);
    // },
    // changedepartment(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/department/department_change", data, fn, errFn);
    // },
    // calculate(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/calculate/calculate_data", data, fn, errFn);
    // },
    // calculateperson(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/calculate/calculate_persondata", data, fn, errFn);
    // },
    // manger(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/manger/get_manger", data, fn, errFn);
    // },
    // changepassword(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/manger/change_password", data, fn, errFn);
    // },
    // userdelete(data, fn, errFn) {
    //     ajax.call(this, 'post', "http://192.168.43.21:9000/manger/user_delete", data, fn, errFn);
    // },
    // customer(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/customerhot/customer", data, fn, errFn);
    // },
    // customerdata(data, fn, errFn) {
    //     ajax.call(this, 'get', "http://192.168.43.21:9000/customerhot/customerdata", data, fn, errFn);
    // },

}



export {
    passenger
}