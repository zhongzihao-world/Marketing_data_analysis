'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.select_dept = (conn, param) => {
    const sql =`SELECT * from department`;
    return conn.queryAsync(sql);
};

exports.select_staff = (conn, param) => {
    const sql =`SELECT * from  staffinfo where dept_id = '${param.dept_id}'`;
    return conn.queryAsync(sql);
};

exports.add_staff = (conn, param) => {
    const sql =`INSERT INTO staffinfo (department, staff, telphone, age, dept_id) VALUES ('${param.department}','${param.input_name}','${param.input_phone}','${param.input_age}','${param.dept_id}')`;
    return conn.queryAsync(sql);
};

exports.add_department = (conn, param) => {
    const sql =`INSERT INTO department  (department) VALUES ('${param.dept_name}')`;
    return conn.queryAsync(sql);
};

exports.department_delete = (conn, param) => {
    const sql =`DELETE FROM department WHERE dept_id = '${param.id}'`;
    return conn.queryAsync(sql);
};

exports.department_change = (conn, param) => {
    const sql =`UPDATE department SET department = '${param.name}' WHERE dept_id = '${param.id}' `;
    return conn.queryAsync(sql);
};