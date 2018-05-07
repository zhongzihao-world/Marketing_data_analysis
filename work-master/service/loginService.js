'use strict';

const loginModule = require(rootPath.concat('/module/loginModule.js'));
const logger = log4js.getLogger('system');

exports.login = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield loginModule.login(conn, req.body);
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

exports.register = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield loginModule.register(conn, req.body);n
        return res.json(util.success({data}));
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});


exports.exit = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield loginModule.login(conn, req.body);
            return res.json(util.success({data}));          
    } catch (error) {
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
  });