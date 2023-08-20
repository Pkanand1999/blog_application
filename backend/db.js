const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: 'admin',
    password: `${process.env.PASSWORD}`,
    database: 'blog'
  });

  
  
  module.exports = connection;