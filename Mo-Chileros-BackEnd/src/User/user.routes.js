'use strict'

const express = require('express')
const api = express.Router();

const userController = require('./user.controller');

api.get('/test', userController.test)
api.post('/register', userController.register)

module.exports = api