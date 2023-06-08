'use strict'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    dpi:{
        type:Number, 
        required : true, 
        maxLength: 13
    }, 
    username:{
        type: String,
        required: true
    },
    rank :{
        type: Number, 
        required:false
    }, 
    name :{
        type: String,
        required: true
    },
    lastname:{
        type: String, 
        required: true
    },
    age:{
        type: Number, 
        required: true,
        maxLength: 2
    },
    email:{
        type: String, 
        required: true
    }, 
    password:{
        type:String, 
        required: true
    },
    history:[{
        name:{type:String}, 
        
    }], 
    role:{
        type:String, 
        required:false
    }, 
    image:{
        type: String,
        required:false
    }, 
    phone:{
        type: Number, 
        required: true
    }

})

module.exports = mongoose.model('User', userSchema);