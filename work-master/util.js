/**
 * 全局设置
 */
global.rootPath = __dirname;
global.Promise = require('bluebird');
global.fs = Promise.promisifyAll(require('fs'));

/**
 * 加载配置文件
 */
global.config = require('./config.json');

/**
 * 配置日志
 */
global.log4js = require('log4js');

/**
 * 加载数据库配置文件
 */
const mysql = require('mysql');
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);
exports.pool = mysql.createPool(config.zzh);

/**
 * 获取数据库连接
 */
exports.getConnect = () => {
    return this.pool.getConnectionAsync().then((conn) => {
        return conn;
    });
};

/**
 * 成功返回
 */
exports.success = (obj) => {
    return Object.assign(obj, config.message.success);
};

/**
 * 返回失败
 */
exports.fail = (obj) => {
    return Object.assign(obj, config.message.error);
};