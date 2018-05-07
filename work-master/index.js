'use strict';

global.util = require('./util.js');
global.express = require('express');
const bodyparser = require('body-parser');
// const ejs = require('ejs');
const app = express();
const logger = log4js.getLogger('system');

//跨域处理
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Cookie');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// 配置post body解析中间件
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// 挂载自定义路由表
app.use('/login', require(rootPath.concat('/router/loginRouter.js')));
app.use('/today', require(rootPath.concat('/router/todayRouter.js')));
app.use('/customerinfo', require(rootPath.concat('/router/customerinfoRouter.js')));
app.use('/department', require(rootPath.concat('/router/departmentRouter.js')));
app.use('/calculate', require(rootPath.concat('/router/calculateRouter.js')));
app.use('/manger', require(rootPath.concat('/router/mangerRouter.js')));
app.use('/customerhot', require(rootPath.concat('/router/customerhotRouter.js')));





// 404错误中间件
app.use((req, res, next) => {
    logger.error(req.url.concat(' not found'));
    res.status(404).send(config.message.notfound);
});

// 服务器内中错误处理
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send(config.message.servererr);
});

// 当发生了未捕获的promise 打印日志
process.on('uncaughtException', (reason, p) => {
    logger.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

// 当发生了未捕获的异常 守护中间件
process.on('uncaughtException', (err) => {
    logger.error(err.stack);
});

// 开启web服务器
const server = app.listen(config.port, () => logger.info('服务器启动成功!', '端口号:', config.port));
