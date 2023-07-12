'use strict '

const Route = require('../routesTravel/route.model')
const Travel = require('./travel.model')

const {validateData,
     encrypt, checkPasssword} = require ('../utils/validate')

exports.test = async (req, res) =>{
    res.send({message: 'test is running'})
}

