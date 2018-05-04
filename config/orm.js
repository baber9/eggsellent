// This FILE is mainly used to store OMRS
// - includes 2 helper functions

// import MySQL connection (from connection.js)
var connection = require('./connection.js');


// FUNCTION - to assist in adding placeholders (?'s) to SQL queryString
function printPlaceholders(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

// FUNCTION - to assist in converting obj to string for SQL queryString
function ObjectToSql(obj) {
    var arr = [];
    for (var key in obj) {
        var keyValue = obj[key];

        // skip hidden properties
        if (Object.hasOwnProperty.call(obj, key)) {
            // if the string has spaces, put value in quotes
            if(typeof keyValue === 'string' && keyValue.indexOf(' ') >= 0) {
                keyValue = "'" + keyValue + "'";
            }
            arr.push(key + '=' + keyValue);
        }
    }
    // console.log(arr);  // [ 'name=bryan', 'cool=\'yes, very\'' ] (from Line 35)
    // convert array to strings before returning
    return arr.toString();
}
// console.log(ObjectToSql({name: 'bryan', cool: 'yes, very'}));  // name=bryan,cool='yes, very'

// ORM for all SQL statements
var orm = {
    selectAll: (tableInput, cb) => {

        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, (err, result) => {
            if (err) {throw err;}
            cb(result);
        });

    },
    insertOne: (table, cols, vals, cb) => {
        
        // build queryString
        var queryString = 'INSERT INTO ' + table;
        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        // call printPlaceholders
        queryString += printPlaceholders(vals.length);
        queryString += ') ';

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if(err) {throw err;}
            cb(result);
        });

    },
    updateOne: (table, objColVals, condition, cb) => {

        // build queryString
        var queryString = 'UPDATE ' + table;
        queryString += ' SET ';
        queryString += ObjectToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        // console.log(queryString);

        connection.query(queryString, (err, result) => {
            if(err) {throw err;}
            cb(result);
        });

    }
}

// export ORM for use in models/eggs.js
module.exports = orm;