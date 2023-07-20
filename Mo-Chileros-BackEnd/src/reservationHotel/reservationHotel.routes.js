'use strict'

const express= require('express');
const api = express.Router();

const hotelReservationController = require('./reservationHotel.controller');
const { ensureAuth } = require('../services/authenticated');

api.get('/test', hotelReservationController.test )

api.post('/createReservation/:travelId/:hotelId/:room', [ensureAuth], hotelReservationController.createHotel)

module.exports = api