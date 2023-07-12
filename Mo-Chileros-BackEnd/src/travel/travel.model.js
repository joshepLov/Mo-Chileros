'use strict'

const mongoose = require('mongoose')
//hola mundo 
const travelSchema = mongoose.Schema({
    route:{
        type : mongoose.Schema.Types.ObjectId, 
            ref: 'Route'
    },
    Place:{
        type: String
    },
    members:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        nameUser:{
            type: String
        }
    }], 
    Activities:[{
        name:{
            type: String
        }, 
        day:{
            type: String
        }, 
        hourStart:{
            type: Number
        },
        hourEnd:{
            type: Number
        }, 
        status:{
            type: Number
        }
    }], 

    Dates:[{
        DateStart:{
            type: Date
        },
        DateEnd:{
            type:Date
        }
    }] , 
    Price:{
        type: Number
    },
    Reservations:[{
        hotel:{
            type: mongoose.Schema.Types.ObjectId,
                ref:'ReservationHotel'
        }, 
        transport:{
            type: mongoose.Schema.Types.ObjectId, 
                ref:'ReservationTrasnport'
        }
    }],



}) 

module.exports = mongoose.model('Travel', travelSchema);
