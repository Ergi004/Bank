const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Ergi',
    password: '1234',
    database: 'Bank'
});

module.exports = connection;