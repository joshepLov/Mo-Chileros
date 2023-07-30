'use strict'

const express = require('express')
const api = express.Router();

const routeController = require('./route.controller');
const {ensureAuth, isAdmin} = require('../services/authenticated')
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({uploadDir: './uploads/Route'})


api.get('/test', routeController.test)
api.post('/createRoute', [ensureAuth], routeController.createRoute)

api.put('/uploadImage/:idRoute', upload, routeController.addImageRoutes)
api.get('/getImageRoom/:fileName', upload, routeController.getImage)

module.exports = api