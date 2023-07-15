'use Strict'

const express = require('express')
const api = express.Router();

const {ensureAuth, isAdmin, isModerator}= require('../services/authenticated')
const travelController = require('./travel.controller')

api.get('/test', travelController.test)

api.post('/createTravel/:routeId',[ensureAuth], travelController.createTravel)

module.exports = api