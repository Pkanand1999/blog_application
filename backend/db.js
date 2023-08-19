const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pankaj@123#',
    database: 'blog'
  });

  
  
  module.exports = connection;