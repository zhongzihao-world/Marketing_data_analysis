'use strict';

const mono = require(rootPath.concat('/module/monologue.js'));

exports.customerhot = (conn, param) => {
    let arr = param;
    for(let i=0;i<arr.length;i++){
        let sql =`INSERT INTO customerdata (energy, width_grid_num, height_grid_num) 
                  VALUES 
        ('${arr[i].energy}','${arr[i].width_grid_num}','${arr[i].height_grid_num}')`; 
    
        conn.queryAsync(sql);
    }

    return 
};

exports.customer = (conn, param) => {
    const sql =`
    SELECT * from companypicture
    `;
    return conn.queryAsync(sql);
};

exports.customerdata = (conn, param) => {

    let date1 = param.start_date;//起始日期
    let date2 = param.end_date;//结束日期
    //计算两个日期月份的差值
    date1 = date1.split('-');
    date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
    date2 = date2.split('-');
    date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
    let m = Math.abs(date1 - date2);
    let selectnum = parseInt(90*m);
    const sql =`
    SELECT * from customerdata WHERE id LIMIT 0, ${selectnum} 
    `;
    return conn.queryAsync(sql);
};
