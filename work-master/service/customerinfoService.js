'use strict';

const customerinfoModule = require(rootPath.concat('/module/customerinfoModule.js'));
const logger = log4js.getLogger('system');

exports.select = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield customerinfoModule.select(conn, req.query);
        if(data.length){
            let len = data.length;
            // let maxPage = Math.ceil(len/req.query.pageSize);//总页数
            let visitorTrackList = []; //返回的数据        
            
            let customerinfo = {
                pageInfo: {
                    currentPage: req.query.currentPage,
                    // listSize: data.length,
                    // maxPage: maxPage,
                    pageSize: req.query.pageSize
                },
                customerList: data
            }

            return res.json(util.success({customerinfo}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});

exports.delcustomer_data = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield customerinfoModule.delcustomer_data(conn, req.body);
        if(data.protocol41){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});