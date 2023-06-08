'use strict'

const Hotel = require('./hotel.model');

const {validateData} = require('../utils/validate')

exports.test = async(req, res)=>{
    res.send({message: 'test hotel is running'})
}