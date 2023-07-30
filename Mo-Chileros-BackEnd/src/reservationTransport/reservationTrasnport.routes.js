'use strict'

const express = require('express')
const api = express.Router()

const transportReservationController = require('./reservationTransport.controller')
const { ensureAuth } = require('../services/authenticated')

api.get('/test', transportReservationController.test)
api.post('/createReservation/:idTravel/:idTransport', ensureAuth, transportReservationController.createReservation)
api.get('/getReservations', transportReservationController.getReservations)
api.get('/getReservation/:id', transportReservationController.getReservation)
api.delete('/cancelReservation/:id/:idTravel', ensureAuth,transportReservationController.cancelReservation)
api.put('/updateReservationTransport/:idReservation/:idTravel/:idTransport', ensureAuth, transportReservationController.updateReservation)

module.exports = api