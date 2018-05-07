'use strict';

const todayService = require(rootPath.concat('/service/todayService.js'));
const todayRouter = express.Router();


todayRouter.get('/today', todayService.todaydata);


module.exports = todayRouter;