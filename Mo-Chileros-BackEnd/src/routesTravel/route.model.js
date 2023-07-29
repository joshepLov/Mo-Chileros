'use strict'

const mongoose = require('mongoose')
//hola mundo 
const RouteSchema = mongoose.Schema({
    status:{
        type: Boolean
    },
    routeDuration: {
        type: Number
    },
    name :{
        type: String
    }, 
    description:{
        type:String
    },
    price:{
        type: Number
    },
    capacityMembers:{
        type:Number
    },
    place:{
        type:String
    },
    score:{
        type:Number
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId, 
           ref: 'User'
    },
    activities:[{
        Activity: {
            type: String
        },
    }]
    
}) 

module.exports = mongoose.model('Route', RouteSchema);
