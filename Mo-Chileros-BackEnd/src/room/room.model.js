'use strict'

const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    consto: {
        type: Number,
        required: true
    },
    image: [
        {
            type: String,
            required: false
        }
    ],
    status: {
        type: String,
        required: true
    }

},
{
    versionKey: false
})