
'use strict'

const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    address:{

        type: String,
        required: true
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
        name: {type: String},
        size: {type: String},
        capacity: {type: Number},
        price: {type: Number},
        image: {type: String},
        dates:
        [{dateStart:{type: Date},
          dataEnd:{type:Date}, 
          status: {type: Boolean} }]  
    }]
    })

module.exports = mongoose.model('Hotel', hotelSchema)

