'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.todaydata = (conn, param) => {
    let date = param.start_date.split('-');
    date[2] = String('01')
    date = date.join('-')    
    const sql =`
    SELECT * from customerinfo where date = '${date}';
    `;
    return conn.queryAsync(sql);
};

exports.yesdaydata = (conn, param) => {
    let date = param.start_date.split('-');
    date[1] = String(date[1]-1)
    date[2] = String('01')
    date = date.join('-')
    const sql =`
    SELECT * from customerinfo where date = '${date}';
    `;
    return conn.queryAsync(sql);
};

exports.todaymoney = (conn, param) => {
    let date = param.start_date.split('-');
    date[2] = String('01')
    date = date.join('-')    
    const sql =`
    SELECT money from monthmoney where date = '${date}';
    `;
    return conn.queryAsync(sql);
};

exports.yesdaymoney = (conn, param) => {
    let date = param.start_date.split('-');
    date[1] = String(date[1]-1)
    date[2] = String('01')    
    date = date.join('-')
    const sql =`
    SELECT money from monthmoney where date = '${date}';
    `;
    return conn.queryAsync(sql);
};
