'use strict';

const mangerModule = require(rootPath.concat('/module/mangerModule.js'));
const logger = log4js.getLogger('system');

exports.get_manger = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield mangerModule.get_manger(conn, req.query);
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

exports.change_password = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield mangerModule.change_password(conn, req.body);
        if(data.changedRows){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});

exports.user_delete = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield mangerModule.user_delete(conn, req.body);
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