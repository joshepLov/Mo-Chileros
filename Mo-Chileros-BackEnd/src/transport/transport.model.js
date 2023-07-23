'use strict'

const mongoose = require('mongoose')

const transportSchema = mongoose.Schema({
    status: {
        type: Boolean,
    },
    name:{
        type:String,
        required:true
    },
    type: {
        type: String, 
        required: true
    },
    typeVehicle:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    image:{
        type:String
    },
    states:[{
        state :{type: mongoose.Schema.Types.ObjectId},
        name:{type: String}
        }], 
        
    })

module.exports = mongoose.model('Transport', transportSchema)

