'use strict'

const mongoose = require('mongoose')

const userScema = mongoose.Schema({
    DPI:{
        type:String, 
        required : true
    }, 
    Rank :{
        type: Number, 
        maxLength:  

    }

})

module.exports = mongoose.model('User', userScema);