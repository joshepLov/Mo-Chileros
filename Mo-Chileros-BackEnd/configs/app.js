'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors'); 

const app = express();

const port = process.env.PORT

const userRoutes = require('../src/User/user.routes')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev')); 

app.use('/user', userRoutes)

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`)
}