'use strict'

const express= require('express')
const api = express.Router();

const hotelController= require('./hotel.controller')
const {ensureAuth, isAdmin, isModerator}= require('../services/authenticated')
//image
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({uploadDir: './uploads/Hotel'})
const uploadRoom = connectMultiparty({uploadDir: './uploads/Rooms'})

//rutas privadas
api.get('/test',[ensureAuth, isModerator], hotelController.test);
// ======================create============================================
api.post('/createHotel', [ensureAuth, isModerator], hotelController.createHotel)
api.put('/addRoom/:id', [ensureAuth, isModerator], hotelController.addRoom)

//=======================reads===============================
api.get('/getHotelsModerator',[ensureAuth,isModerator], hotelController.getHotelsModerator)
api.get('/getHotelModerator/:id', [ensureAuth, isModerator], hotelController.getHotelModerator)
api.get('/getRoomsModerator/:id', [ensureAuth, isModerator], hotelController.getRoomsModerator)
api.get('/getRoomModerator/id/:roomdId',[ensureAuth, isModerator], hotelController.getRoomModerator)

//======================update=========================
api.put('/UpdateHotel/:id',[ensureAuth, isModerator], hotelController.updateHotel)
api.put('/updateRoom/:hotelId/:id', [ensureAuth, isModerator], hotelController.updateRoom)

//=====================delete============================================
api.put('/desactivateHotel/:id',[ensureAuth, isModerator], hotelController.desactivateHotel)
api.put('/desactivateRoom/:id/:roomId', [ensureAuth, isModerator], hotelController.desactivateRoom)

//======================activate=================================
api.put('/activateHotel/:id',[ensureAuth, isModerator], hotelController.activateHotel)
api.put('/activateRoom/:id/:roomId', [ensureAuth, isModerator], hotelController.activateRoom)

//rutas  publicas (mochileros)
api.get('/getHotels',hotelController.getHotelsMochileros)
api.get('/getHotel/:id', hotelController.getHotelMochileros);
api.get('/getRooms/:id', hotelController.getRooms)
api.get('/getRoom/:id/:roomId', hotelController.getRoom)

// ===========================imagenes==============================================
api.put('/uploadImage/:id',upload, hotelController.addImage);
api.get('/getImage/:fileName',upload, hotelController.getImage);
// ===========================habitaciones
// ===========================imagenes==============================================
api.put('/uploadImageRoom/:id',uploadRoom, hotelController.addImageRoom);
api.get('/getImageRoom/:fileName',uploadRoom, hotelController.getImage);


module.exports = api