'use strict'

const express = require('express')
const api = express.Router();

const routeController = require('./route.controller');
const {ensureAuth, isAdmin, isModerator} = require('../services/authenticated')
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({uploadDir: './uploads/Route'})


api.get('/test', routeController.test)
// ============================Create===============================
api.post('/createRoute', [ensureAuth], routeController.createRoute)
// ============================Read ==============================
api.get('/getRoutes',  routeController.getRoutesMochilero)
api.get('/getRoute/:id', routeController.getRouteMochilero)
// moderador
api.get('/getRoutesModerator', [ensureAuth,isModerator], routeController.getRoutesModereator)

api.get('/getRouteModerator/:id', [ensureAuth, isModerator], routeController.getRouteModerator)

api.put('/uploadImage/:idRoute', upload, routeController.addImageRoutes)
api.get('/getImageRoom/:fileName', upload, routeController.getImage)

module.exports = api