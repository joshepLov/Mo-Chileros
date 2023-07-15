'use strict'

const mongoose = require('mongoose')

const travelSchema = mongoose.Schema({
    route:{
        type : mongoose.Schema.Types.ObjectId, 
            ref: 'Route'
    },
    place:{
        type: String
    },
    capacity:{
        type:Number
    },
    cordinator: {
        type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
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
    dateStart:{
        type: Date
    },
    dateEnd:{
        type: Date
    }, 
    price:{
        type: Number
    },
    reservations:[{
        hotel:{
            type: mongoose.Schema.Types.ObjectId,
                ref:'ReservationHotel'
        }, 
        transport:{
            type: mongoose.Schema.Types.ObjectId, 
                ref:'ReservationTransport'
        }
    }],
    status:{
        type: Boolean
    },
    travelStatus:{
        type: Number
    }

}) 

module.exports = mongoose.model('Travel', travelSchema);
