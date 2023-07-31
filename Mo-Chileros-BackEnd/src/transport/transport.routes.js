'use strict'

const express = require('express');
const api = express.Router();

const transportController = require('./transport.controller')
const {ensureAuth, isModerator, isMochilero} = require('../services/authenticated')
//image
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({uploadDir: './uploads/Transport'})

// RUTAS PRIVADAS 
api.get('/test', [ensureAuth,isModerator],transportController.test);
//===========================create========================================
api.post('/createTransport',[ensureAuth, isModerator], transportController.createTransport)

api.get('/getTransportsModerator',[ensureAuth,isModerator], transportController.getTransportsModerator)
api.get('/getTransportModerator/:id',[ensureAuth,isModerator], transportController.getTransportModerator)

api.put('/updateTransport/:id', [ensureAuth, isModerator], transportController.updateTransport)

api.put('/desactivateTransport/:id',[ensureAuth,isModerator], transportController.desactivateTransport)

api.put('/activateTransport/:id',[ensureAuth,isModerator], transportController.activateTransport)

//rutas publicas 

api.get('/getTransports',[ensureAuth,],transportController.getTransportsMochileros)
api.get('/getTransport/:id',[ensureAuth, ] ,transportController.getTransportMochileros)


//image
api.put('/uploadImage/:id',upload, transportController.addImage);
api.get('/getImage/:fileName',upload, transportController.getImage);
module.exports = api

//image
api.put('/uploadImage/:id',upload, transportController.addImage);
api.get('/getImage/:fileName',upload, transportController.getImage);
module.exports = api