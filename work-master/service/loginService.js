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
        // const data = yield loginModule.email_exit(conn, req.body.email);
        // const data = yield loginModule.register(conn, req.body);
        const data = yield Promise.all([
            loginModule.email_exit(conn, req.body.email),
            loginModule.username_exit(conn, req.body.username),
        ])
        if(data[0].length || data[1].length){
            if(data[0].length){
                let data = '该邮箱已经被注册！';
                return res.json(util.fail({data}));
            }
            if(data[1].length){
                let data = '该用户名已经有人使用！';
                return res.json(util.fail({data}));
            }
        }else{
            const data = yield loginModule.register(conn, req.body);
            if(data){
                return res.json(util.success({data}));
            }else
               {return res.json(util.fail({data}));}
        }
    }catch(error){
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