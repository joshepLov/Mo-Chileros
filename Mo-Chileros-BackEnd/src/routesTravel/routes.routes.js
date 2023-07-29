'use strict'

const express = require('express')
const api = express.Router();

const routeController = require('./route.controller');
const {ensureAuth, isAdmin} = require('../services/authenticated')
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({uploadDir: './uploads/User'})


api.get('/test', routeController.test)
// ============================Create===============================
api.post('/createRoute', [ensureAuth], routeController.createRoute)
// ============================Read ==============================
api.get('/getRoutes',  routeController.getRoutesMochilero)
api.get('/getRoute/:id', routeController.getRouteMochilero)


module.exports = api