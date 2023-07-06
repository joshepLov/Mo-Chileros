'use strict'

const mongoose = require('mongoose')
//hola mundo 
const travelSchema = mongoose.Schema({
    status:{
        type: Number
    },
    members:[{
        member:{type:mongoose.Schema.Types.ObjectId,
            ref: 'User'},
        name:{
            type:String
        }
    }], 
    schedule:[{
        place:{type:String},
        
    }]

}) 

modeule.exports = mongoose.model('Travel', travelSchema);
