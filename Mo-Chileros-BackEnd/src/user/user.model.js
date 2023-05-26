'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    DPI: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,  //CON ESTO SE LOGUEARÁ 
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true,  
    },
    password: {
        type: String,   //CON ESTO SE LOGUEARÁ 
        required: true
    }   ,
    phone: {
        type: String,
        required: true
    },
    range: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        uppercase: true
    },
    image: {
        type: String,
        required: false
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);