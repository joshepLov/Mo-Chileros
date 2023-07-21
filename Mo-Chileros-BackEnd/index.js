'use strict'

<<<<<<< HEAD
require('dotenv').config()
const mongoConfig = require('./config/mongo');
const app = require('./config/app');
const { adminDefault } = require('./src/user/user.controller');

mongoConfig.connect();
app.initServer();
adminDefault();
=======
require('dotenv').config();
const app = require('./configs/app')
const mongo = require('./configs/mongo');
const admin = require('./src/User/user.controller')

app.initServer();
mongo.connect();
admin.userDefault();

>>>>>>> origin/mhurtado
