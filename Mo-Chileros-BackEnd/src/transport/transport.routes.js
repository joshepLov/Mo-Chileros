'use strict'

const express = require('express')
const api = express.Router()
const transporController = require('./transport.controller')

api.post('/add', transporController.addTransport)
api.get('')