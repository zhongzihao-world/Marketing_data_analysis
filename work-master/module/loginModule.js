'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.login = (conn, param) => {
    const sql =`
    SELECT * from userinfo where username='${param.username}' and password= '${param.password}'
    `;
    return conn.queryAsync(sql);
};

exports.exit = (conn, param) => {
    const sql =`
    SELECT * from userinfo where username='${param.username}'
    `;
    return conn.queryAsync(sql);
}


exports.register = (conn, param) => {
    const sql = mono().insert('userinfo', param).query().sql;
    return conn.queryAsync(sql);
};