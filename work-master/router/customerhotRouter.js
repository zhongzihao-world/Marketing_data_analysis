'use strict';

const customerhotservice = require(rootPath.concat('/service/customerhotservice.js'));
const customerhotRouter = express.Router();


customerhotRouter.get('/customer', customerhotservice.customer);

customerhotRouter.post('/customerhot', customerhotservice.customerhot);

customerhotRouter.get('/customerdata', customerhotservice.customerdata);


module.exports = customerhotRouter;