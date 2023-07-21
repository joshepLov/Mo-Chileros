'use strict'

const mongoose = require('mongoose')

const transportSchema = mongoose.Schema({
<<<<<<< HEAD
    type:{
        type: String,
        required: true,
        upperCase: true
    },
    description:{
        type: String,
        required: true 
    },
    price: {
=======
    status: {
        type: Boolean,
    },
    name:{
        type:String,
        required:true
    },
    type: {
        type: String, 
        required: true
    },
    typeVehicle:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
>>>>>>> origin/mhurtado
        type: Number,
        required: true
    },
    capacity: {
<<<<<<< HEAD
        type: Number, 
        required: true
    },
    image: {
        type: String,
        required: false 
    },
    status: {
        type: Boolean,
        required: true
    },
    versionKey: false


},
{
    versionKey: false
})

module.exports  = mongoose.model('Transport', transportSchema)
=======
        type: Number,
        required: true
    },
    image:{
        type:String
    },
    states:[{
        state :{type: mongoose.Schema.Types.ObjectId},
        name:{type: String}
        }], 
        
    })

module.exports = mongoose.model('Transport', transportSchema)

>>>>>>> origin/mhurtado
