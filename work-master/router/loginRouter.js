'use strict';

const loginService = require(rootPath.concat('/service/loginService.js'));
const loginRouter = express.Router();


loginRouter.post('/login', loginService.login);

loginRouter.post('/register', loginService.register);

module.exports = loginRouter;