'use strict'

const mongoose = require('mongoose')
const reservationTransportSchema= mongoose.Schema({

  travel:{
    type: mongoose.Schema.Types.ObjectId, 
        ref: 'Travel'
  },
  transpor: {
    type: mongoose.Schema.Types.ObjectId, 
        ref: 'Transport'
  }, 
  date:{
    type: Date
},
  price:{
    type: Number
  }

}) 

modeule.exports = mongoose.model('reservationTrasnport', reservationTransportSchema);
