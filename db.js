var mysql = require('mysql');

config = {
   host: 'localhost',
   user: 'otto',
   password: '1234',
   database: 'web1',
   port : 3307
}
var connection =mysql.createConnection(config); //added the line

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;