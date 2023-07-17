'use strict'

const mongoose = require('mongoose')
const reservationHotelSchema = mongoose.Schema({

  travel:{
    type: mongoose.Schema.Types.ObjectId, 
        ref: 'Travel'
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hotel'
  },
  room:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel.room'
  }, 
  date:{
    type: Date
  },
  price:{
    type: Number
  }

}) 

modeule.exports = mongoose.model('ReservationHotel', reservationHotelSchema);
