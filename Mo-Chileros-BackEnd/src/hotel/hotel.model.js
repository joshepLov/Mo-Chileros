
'use strict'

const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    status: {
        type: Boolean
    },
    name: {
        type: String, 
        required: true
    },
    address:{

        type: String,
        required: true
    },
    state:{
        type:String
    },

    image:{
        type: String,
        required: false
       
    },
    description: {
        type: String,
        required: true
    },
    room:[{
        status:{type:Boolean},
        name: {type: String},
        capacity: {type: Number},
        price: {type: Number},
        image: {type: String},
        
        }], 
        
    })

module.exports = mongoose.model('Hotel', hotelSchema)

