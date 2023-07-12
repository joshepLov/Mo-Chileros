'use Strict'

const express = require('express')
const api = express.Router();

const travelController = require('./travel.controller')

api.get('/test', travelController.test)

module.exports = api