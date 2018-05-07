'use strict';

const customerhotModule = require(rootPath.concat('/module/customerhotModule.js'));
const logger = log4js.getLogger('system');

exports.customerhot = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield customerhotModule.customerhot(conn, req.body);
        if(data.length){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
  });

exports.customer = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield customerhotModule.customer(conn, req.body);
        if(data.length){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});


exports.customerdata = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield customerhotModule.customerdata(conn, req.query);
        if(data.length){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
  });