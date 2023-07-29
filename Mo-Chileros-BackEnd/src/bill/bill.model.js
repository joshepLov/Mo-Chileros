'use strict'

const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    travel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reservationTranport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservationTransport',
        default: 0
        
    },
    reservationHotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReservationHotel',
        default: 0
    },
    paymentMethod: {
        type: String
    },
    roomPrice: {
        type: Number
    },
    transportPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: Boolean
    }

})

module.exports = mongoose.model('Bill', billSchema)