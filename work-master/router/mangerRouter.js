'use strict';

const mangerService = require(rootPath.concat('/service/mangerService.js'));
const mangerRouter = express.Router();

//获取所有管理员信息
mangerRouter.get('/get_manger', mangerService.get_manger);

//修改密码
mangerRouter.post('/change_password', mangerService.change_password);

//删除账号
mangerRouter.post('/user_delete', mangerService.user_delete);

module.exports = mangerRouter;