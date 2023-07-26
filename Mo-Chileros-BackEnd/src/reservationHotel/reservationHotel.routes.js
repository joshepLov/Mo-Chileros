'use strict'

const express = require('express');
const api = express.Router();

const hotelReservationController = require('./reservationHotel.controller');
const { ensureAuth } = require('../services/authenticated');

api.get('/test', hotelReservationController.test)

/* api.post('/createReservation/:travelId/:hotelId/:room', [ensureAuth], hotelReservationController.createHotel)
 */
api.post('/reservation/:idTravel/:idHotel/:idRoom', [ensureAuth], hotelReservationController.reservacion)
api.get('/getReservations', ensureAuth, hotelReservationController.getReservations)
api.get('/getReservationId/:id', ensureAuth, hotelReservationController.getReservationId)
api.get('/getReservationLogged', ensureAuth, hotelReservationController.getReservationLogged)
api.delete('/cancelReservation/:id/:idTravel', ensureAuth, hotelReservationController.cancelReservation)
api.put('/updateReservation/:idTravel/:idHotel/:idRoom/:idReservation', ensureAuth,hotelReservationController.updateReservation)

module.exports = api