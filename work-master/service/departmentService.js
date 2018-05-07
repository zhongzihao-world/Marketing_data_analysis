'use strict';

const departmentModule = require(rootPath.concat('/module/departmentModule.js'));
const logger = log4js.getLogger('system');

exports.select_dept = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield departmentModule.select_dept(conn, req.query);
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

  exports.select_staff = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield departmentModule.select_staff(conn, req.query);
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

exports.add_staff = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield departmentModule.add_staff(conn, req.body);
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

exports.add_department = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield departmentModule.add_department(conn, req.body);
        if(data){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});

exports.department_delete = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield departmentModule.department_delete(conn, req.body);
        if(data){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});

exports.department_change = Promise.coroutine(function*(req, res, next) {
    let conn;
    try {
        conn = yield util.getConnect();
        const data = yield departmentModule.department_change(conn, req.body);
        if(data){
            return res.json(util.success({data}));            
        }else{return res.json(util.fail({data}));}
    } catch (error) {
        logger.error(error.stack);
        return res.json(config.message.error);
    } finally {
        conn.release();
    }
});
