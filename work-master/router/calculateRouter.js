'use strict';

const calculateService = require(rootPath.concat('/service/calculateService.js'));
const calculateRouter = express.Router();


calculateRouter.get('/calculate_data', calculateService.calculate_data);

calculateRouter.get('/calculate_persondata', calculateService.calculate_persondata)


module.exports = calculateRouter;