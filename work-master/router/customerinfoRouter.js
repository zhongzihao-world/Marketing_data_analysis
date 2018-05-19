'use strict';

const customerinfoService = require(rootPath.concat('/service/customerinfoService.js'));
const customerinfoRouter = express.Router();


customerinfoRouter.get('/select', customerinfoService.select);

customerinfoRouter.post('/delcustomer_data', customerinfoService.delcustomer_data);


module.exports = customerinfoRouter;