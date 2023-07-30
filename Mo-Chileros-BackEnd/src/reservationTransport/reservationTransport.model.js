'use strict'

const mongoose = require('mongoose')
const reservationTransportSchema = mongoose.Schema({

  travel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Travel'
  },
  transport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport'
  },
  /* date: {
    type: Date
  }, */
  dateStart: {
    type: Date
  },
  dateFinal: {
    type: Date
  },
  price: {
    type: Number
  }

})

module.exports = mongoose.model('reservationTransport', reservationTransportSchema);
