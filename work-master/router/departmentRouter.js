'use strict';

const departmentService = require(rootPath.concat('/service/departmentService.js'));
const departmentRouter = express.Router();

//选择所有部门
departmentRouter.get('/select_dept', departmentService.select_dept);

//选择部门对应的员工
departmentRouter.get('/select_staff', departmentService.select_staff);

//增加部门员工
departmentRouter.post('/add_staff', departmentService.add_staff);

//增加部门
departmentRouter.post('/add_department', departmentService.add_department);

//删除部门
departmentRouter.post('/department_delete', departmentService.department_delete);

//修改部门
departmentRouter.post('/department_change', departmentService.department_change);

module.exports = departmentRouter;