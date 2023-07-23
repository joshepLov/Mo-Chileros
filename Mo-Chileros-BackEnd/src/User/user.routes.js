'use strict'

const express = require('express')
const api = express.Router();

const userController = require('./user.controller');
const {ensureAuth, isAdmin} = require('../services/authenticated')
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({uploadDir: './uploads/User'})


api.get('/test',[ensureAuth,isAdmin], userController.test)
api.post('/registerAdmin',[ensureAuth,isAdmin], userController.registerAdmin)
api.get('/getUser/:id', [ensureAuth], userController.getUser)
api.get('/getUsers', [ensureAuth], userController.getUsers)
api.post('/register', userController.register)
api.post('/login', userController.login)
api.put ('/updateMochilero/:id/:username',[ensureAuth], userController.UpdateUser )


api.put('/uploadImage/:id',upload, userController.addImage);
api.get('/getImage/:fileName',upload, userController.getImage);
module.exports = api