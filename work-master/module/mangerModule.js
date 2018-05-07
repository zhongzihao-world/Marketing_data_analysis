'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.get_manger = (conn, param) => {
    const sql =`
    SELECT * from userinfo
    `;
    return conn.queryAsync(sql);
};


exports.change_password = (conn, param) => {
    const sql =`
    UPDATE  userinfo SET password = '${param.password}' WHERE username = '${param.username}'
    `;
    return conn.queryAsync(sql);
};

exports.user_delete = (conn, param) => {
    const sql =`
    DELETE  FROM userinfo  WHERE username = '${param.username}'
    `;
    return conn.queryAsync(sql);
};