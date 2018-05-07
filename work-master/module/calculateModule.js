'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.calculate = (conn, param) => {  
    const sql =`
    SELECT * from customerinfo where date between '${param.start_date}' and '${param.end_date}';
    `;
    return conn.queryAsync(sql);
};

exports.calculate_ = (conn, param) => {  
    const sql =`
    SELECT * from monthmoney where date between '${param.start_date}' and '${param.end_date}';
    `;
    return conn.queryAsync(sql);
};

exports.calculate_man = (conn, param) => {  
    const sql =`
    SELECT * from customerinfo where sex = '男' 
    and date between '${param.start_date}' and '${param.end_date}';
    `;
    return conn.queryAsync(sql);
};

exports.calculate_woman = (conn, param) => {  
    const sql =`
    SELECT * from customerinfo where sex = '女' 
    and date between '${param.start_date}' and '${param.end_date}';
    
    `;
    return conn.queryAsync(sql);
};

