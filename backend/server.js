const { configDotenv } = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(morgan("dev"));


app.listen(port,function(){
    console.log('listening on port');
});