'use strict'

const express = require('express')
const api = express.Router();

const userController = require('./user.controller');
const {ensureAuth, isAdmin} = require('../services/authenticated')

api.get('/test',[ensureAuth,isAdmin], userController.test)
api.post('/register', userController.register)
api.post('/login', userController.login)
api.put ('/updateMochilero/:id/:username',[ensureAuth], userController.UpdateUser )

module.exports = api