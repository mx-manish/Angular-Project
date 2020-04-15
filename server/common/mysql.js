const mysql = require('mysql');
const mysqlConfig = require('./mysql.json');

module.exports.queryEngine = {
    createConnection: () => {
        this.mysqlPool = mysql.createPool(mysqlConfig);
    },
    executeQuery: (query) => {
        return new Promise((resolve, reject) => {
            this.mysqlPool.getConnection((err, connection) => {
                if (err || !connection) {
                    reject('Unable to connect to server');
                    return;
                }
                connection.query(query, (error, results, fields) => {
                    if (error) {
                        reject('Unable to execute query');
                        return;
                    }
                    connection.release();
                    resolve(results);
                })
            })
        })
    }
};