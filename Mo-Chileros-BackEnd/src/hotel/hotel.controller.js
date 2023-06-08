'use strict'

const Hotel = require('./hotel.model');

const {validateData} = require('../utils/validate')

exports.test = async(req, res)=>{
    res.send({message: 'test hotel is running'})
}
// creacion del hotel
exports.createHotel = async(req, res)=>{
    try {
        let data = req.body
        //preguntar si esta funcion puede servir para la seguridad y el control de la aplicacion
        // obtener valores de quien va realizar la operacion
        let dataId = req.params.id
        //datos obligatorios
        let params={
            name:data.name, 
            address: data.address, 
            description: data.description,
        }
        // validacion de datos
        let validateParams = validateData(params);
        if(validateParams) return res.status(403).send(validateParams);
        // verificar si existe un hotel
        let findHotel = await Hotel.findOne({
            or:[
                {name:data.name},
                {address: data.address}
            ]
        });
        if(findHotel) return res.status(409).send({message: 'Hotel already exist'})
        //creacion del hotel
        let hotel = new Hotel(data);
        await hotel.save();
        return res.send({message:'hotel created succesfuly', hotel})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error trying save hotel, try later'})
    }
}
// creacion de habitacion en hotel
exports.addRoom =async(req, res) => {
    try {
        //data
        let idHotel = req.params.id
        let data = req.body
        // validacion de parametros
        let params ={
            name: data.name,
            capacity: data.capacity, 
            price: data.price
        }
        let validateParams = validateData(params)
        if(validateParams) return res.status(403).send(validateParams);
        // verificar si existen parametros 
        let hotelExists = await Hotel.findOne({
            $or:[
                {_id: idHotel},
            ],
           $exists:[
               {'room.name': data.name},
            ] 
           });
        if(!hotelExists) return res.status(404).send({message: `hotel didn't find or some data already exists`});
        
        let addRoom = await Hotel.findOneAndUpdate(
            {_id: idHotel},
            {$push:{
                room: data
            }},
            {new:true}
            ); 
        if(!addRoom) return res.status(404).send({message: 'error adding room'})
        return res.send({message: 'room created', addRoom})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'error adding room'})
    }
}