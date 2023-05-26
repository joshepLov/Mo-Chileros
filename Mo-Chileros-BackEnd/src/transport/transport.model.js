'use strict'

const mongoose = require('mongoose')

const transportSchema = mongoose.Schema({
    type:{
        type: String,
        required: true,
        upperCase: true
    },
    description:{
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number, 
        required: true
    },
    image: {
        type: String,
        required: false 
    },
    status: {
        type: Boolean,
        required: true
    },
    versionKey: false


})

module.exports  = mongoose.model('Transport', transportSchema)