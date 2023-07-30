'use strict'

const express = require('express')
const api = express.Router()

const billController = require('./bill.controller')
const { ensureAuth } = require('../services/authenticated');


api.get('/test', billController.test)
api.post('/createBill/:idTravel/:idReservationTransport', ensureAuth,billController.createBill)
api.get('/gettBillLogged', ensureAuth, billController.getBillLogged)
api.get('/getBills', billController.gettBills)
api.put('/updateBill/:idTravel', billController.updatedBill)

module.exports = api
