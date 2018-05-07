'use strict';

const calculateModule = require(rootPath.concat('/module/calculateModule.js'));
const logger = log4js.getLogger('system');

exports.calculate_data = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield Promise.all([
            calculateModule.calculate(conn, req.query),
            calculateModule.calculate_(conn, req.query),
        ])
        // const data = yield  calculateModule.calculate_persondata(conn, req.query);
        let people = data[0].length;
        let man_count = 0;
        let woman_count =0;
        let money_count =0;
        let day_count = 0;
        //画图所用数据
        let ershisanshi=0, sanshisishi=0, sishiwushi=0, wushiliushi=0, liushiyishang=0;
        let list_money = [];
        let list_people = {};
        function  DateDiff(sDate1,  sDate2){     
            var  aDate,  oDate1,  oDate2,  iDays  
            aDate  =  sDate1.split("-")  
            oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式  
            aDate  =  sDate2.split("-")  
            oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
            iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
            return  iDays  
         }
        if(data.length){
            for(let i=0,len=data[0].length; i<len;i++){
                if(data[0][i].sex =='男'){
                    man_count++;
                }
                if(data[0][i].sex =='女'){
                    woman_count++;
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
                let date = data[0][i].date
            }
            for(let i=0,len=data[1].length; i<len;i++){
                let date = data[1][i].date
                let date_money = data[1][i].money               
                let month_data = {};
                month_data[date] = date_money;

                list_money.push(month_data)
                money_count += data[1][i].money;
            }

            //返回的数据
            let count_data = {
                peopledata: {
                    man_count: man_count,
                    woman_count: woman_count,
                    people: people,
                    day_count:   DateDiff(req.query.start_date, req.query.end_date)   
                },
                money: {
                    money_count: money_count
                },
                stay_time: {
                    '20-30岁': ershisanshi ,
                    '30-40岁': sanshisishi,
                    '40-50岁': sishiwushi,
                    '50-60岁': wushiliushi,
                    '60岁以上': liushiyishang,
                },
                list_money: list_money,
            }

            return res.json(util.success({count_data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});



exports.calculate_persondata = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield Promise.all([
            calculateModule.calculate_man(conn, req.query),
            calculateModule.calculate_woman(conn, req.query),
        ])
        if(data.length){
            let persondata = {};


            let date1 = req.query.start_date;//起始日期
            let date2 = req.query.end_date;//结束日期

            //计算两个日期月份的差值
            date1 = date1.split('-');
            date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
            date2 = date2.split('-');
            date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);


            let m = Math.abs(date1 - date2)+2;
            for(let i=1;i<m;i++){
                //计数
                let man_ =0;
                let woman_ =0;
                let mandata=data[0];
                let womandata=data[1];
                
                //动态对比不同月份的男女顾客情况
                let date_ = req.query.start_date.split('-');
                if(i<10){
                    date_[1] = '0'+i;
                }else{
                    date_[1] = i;
                }
                let date__ = date_.join('-');
                

                for(let i=0;i<data[0].length;i++){
                    if(mandata[i].date === date__){
                        man_++;
                    }
                }
                for(let i=0;i<data[1].length;i++){
                    if(womandata[i].date === date__){
                        woman_++;
                    }
                }

                persondata[i+'月']={
                    man_: man_,
                    woman_: woman_
                }
            }

            return res.json(util.success({persondata}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
  });