'use strict';

const todayModule = require(rootPath.concat('/module/todayModule.js'));
const logger = log4js.getLogger('system');

exports.todaydata = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        // const data = yield  todayModule.todaydata(conn, req.query);
        const data = yield Promise.all([
            todayModule.todaydata(conn, req.query),
            todayModule.yesdaydata(conn, req.query),
            todayModule.todaymoney(conn, req.query),
            todayModule.yesdaymoney(conn, req.query),
        ])
        if(data.length){
            //0代表这个月的,1为上个月
            let current_man=0,current_woman=0;
            let current_man1=0,current_woman1=0;
            let totalCustomer =data[0].length;
            let totalCustomer1 =data[1].length;
            let staytime =0;
            let staytime1 =0;
            let money=0;
            let money1=0;
            let ershisanshi=0, sanshisishi=0, sishiwushi=0, wushiliushi=0, liushiyishang=0;

            //这个月
            for(let len=data[0].length,i=0;i<len;i++){
                staytime += data[0][i].time/data[0].length;
                if(data[0][i].sex=='男'){
                    current_man++;
                }
                if(data[0][i].sex=='女'){
                    current_woman++;
                }
                if(data[0][i].age>=20 && data[0][i].age<30){
                    ershisanshi++;
                }
                if(data[0][i].age>=30 && data[0][i].age<40){
                    sanshisishi++;
                }
                if(data[0][i].age>=40 && data[0][i].age<50){
                    sishiwushi++;
                }
                if(data[0][i].age>=50 && data[0][i].age<60){
                    wushiliushi++;
                }
                if(data[0][i].age>=60){
                    liushiyishang++;
                }
            }  
            if(data[2][0]){
                money = data[2][0].money || 1;   
            }
             
            //上个月
            for(let len=data[1].length,i=0;i<len;i++){
                staytime1 += data[1][i].time/data[1].length;
                if(data[1][i].sex=='男'){
                    current_man1++;
                }
                if(data[1][i].sex=='女'){
                    current_woman1++;
                }
            }
            if(data[3][0]){
                money1 = data[3][0].money || 1;   
            }
            
            
            //保留两位有效数字
            let man_rate = Math.round(parseFloat((current_man - current_man1)/current_man)*100)/100
            let woman_rate = Math.round(parseFloat((current_woman - current_woman1)/current_woman)*100)/100
            let totalCustomer_rate = Math.round(parseFloat((totalCustomer - totalCustomer1)/totalCustomer)*100)/100
            let stay_time_rate = Math.round(parseFloat((staytime - staytime1)/staytime)*100)/100
            let money_rate = Math.round(parseFloat((money - money1)/money)*100)/100
            //返回的数据
            let tomonthdata={
                man: {
                    current_man: current_man,
                    man_rate: man_rate                    
                },
                woman: {
                    current_woman: current_woman,
                    woman_rate: woman_rate
                },
                total: {
                    totalCustomer: totalCustomer,
                    totalCustomer_rate: totalCustomer_rate
                },
                time: {
                    staytime:  parseInt(staytime),
                    stay_time_rate: stay_time_rate
                },
                money: {
                    money: parseInt(money),
                    money_rate: money_rate
                },
                stay_time: {
                    '20-30岁': ershisanshi ,
                    '30-40岁': sanshisishi,
                    '40-50岁': sishiwushi,
                    '50-60岁': wushiliushi,
                    '60岁以上': liushiyishang,
                },

            }
            return res.json(util.success({tomonthdata}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});