'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.login = (conn, param) => {
    const sql =`
    SELECT username,role from userinfo where password='${param.password}' and email= '${param.email}'
    `;
    return conn.queryAsync(sql);
};

exports.email_exit = (conn, param) => {
    let email = param
    const sql =`
    SELECT email from userinfo where email='${email}'
    `;
    return conn.queryAsync(sql);
}


exports.username_exit = (conn, param) => {
    let username = param
    const sql =`
    SELECT username from userinfo where username='${username}'
    `;
    return conn.queryAsync(sql);
}

exports.register = (conn, param) => {
    let userinfo = param;

    const sql =`INSERT INTO userinfo (username, password, email) 
                VALUES 
    ('${userinfo.username}','${userinfo.password}','${userinfo.email}')`; 
    
    return conn.queryAsync(sql);
};