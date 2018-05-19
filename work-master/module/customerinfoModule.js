'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.select = (conn, param) => {
    let  count= (param.currentPage-1)*14;    
    const sql =`SELECT * from customerinfo where date between '${param.start_date}' and '${param.end_date}' limit ${count}, 14;`;
    return conn.queryAsync(sql);
};

exports.delcustomer_data = (conn, param) => {
    const sql =`
    DELETE  FROM customerinfo  WHERE id = '${param.id}'
    `;
    return conn.queryAsync(sql);
};