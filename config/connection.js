// Config FILE to SETUP MySQL

// require mysql node module
var mysql = require('mysql');

// set connection
var connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: '',                           // REMOVE BEFORE PUSH
    password: '',                       // REMOVE BEFORE PUSH
    database: 'egg_db'
});

// create connection
connection.connect((err) => {
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

// export for ORM use
module.exports = connection;
