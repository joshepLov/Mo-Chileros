'use strict'

const express= require('express')
const api = express.Router();

const hotelController= require('./hotel.controller')
const {ensureAuth, isAdmin, isModerator}= require('../services/authenticated')

api.get('/test', hotelController.test)
api.post('/createHotel', [ensureAuth, isModerator], hotelController.createHotel)
api.put('/addRoom/:id', [ensureAuth, isModerator], hotelController.addRoom)
module.exports = api