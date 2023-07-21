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
  user:{
    type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
  },
  dates:[{

    date: {type: Date}
  },
],
  price:{
    type: Number
  }

}) 

module.exports = mongoose.model('ReservationHotel', reservationHotelSchema);
