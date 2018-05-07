'use strict';

const customerinfoService = require(rootPath.concat('/service/customerinfoService.js'));
const customerinfoRouter = express.Router();


customerinfoRouter.get('/select', customerinfoService.select);


module.exports = customerinfoRouter;