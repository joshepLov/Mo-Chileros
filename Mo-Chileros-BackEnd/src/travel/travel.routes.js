'use Strict'

const express = require('express')
const api = express.Router();

const { ensureAuth, isAdmin, isModerator } = require('../services/authenticated')
const travelController = require('./travel.controller')
const membersController = require('./members.controller')
const connectMultiparty = require('connect-multiparty')
const upload = connectMultiparty({ uploadDir: './uploads/Travel' })

api.get('/test', travelController.test)
api.get('/testMember', membersController.test)
// create
api.post('/createTravel/:routeId', [ensureAuth], travelController.createTravel)
api.put('/addMember/:id/:userId', [ensureAuth], membersController.addMembers)
//read 
//mochileros 
api.get('/getTravels', [ensureAuth], travelController.getTravelsMochileros)
api.get('/getTravel/:id', [ensureAuth], travelController.getTravelMochileros)
api.get('/getMembers/:id', [ensureAuth], membersController.getMembers)
// update 
api.put('/updateTravel/:id', [ensureAuth], travelController.UpdateTravel)
api.put('/deleteMember/:id/:userId', [ensureAuth], membersController.deleteMember)
//MODERATORS
api.get('/getTravelsModerators', [ensureAuth, isModerator], travelController.getTravelsMochileros)
api.get('/getTravelModerator/:id', [ensureAuth, isModerator], travelController.getTravelMochileros)



api.put('/shareExperience/:idTravel', upload, ensureAuth, travelController.shareExperience)
api.get('/getExperienceImage/:fileName', upload, travelController.getExperienceImage)
api.get('/getExperience/:idTravel', travelController.getExperience)

module.exports = api