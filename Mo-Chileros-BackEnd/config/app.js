'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
//Puerto
const port = process.env.PORT

//Exportar rutas


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(cors()); 
app.use(morgan('dev'))

//Utilizar las rutas


exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}
