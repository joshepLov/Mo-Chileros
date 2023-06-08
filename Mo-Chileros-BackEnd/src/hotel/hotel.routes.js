'use strict'

const express= require('express')
const api = express.Router();

const hotelController= require('./hotel.controller')
const {ensureAuth, isAdmin}= require('../services/authenticated')

api.get('/test', hotelController.test)
module.exports = api