'use strict'

// Constantes modelos
const Route = require('./route.model')
const User = require('../User/user.model')

//utils 
const { validateData } = require("../utils/validate");

//funcion test
exports.test =async (req, res) =>{
    res.send({Message: 'hola mundo'})
}

//funcion crear Ruta(esta ruta es 'nula')
exports.createRoute = async(req,res)=>{
    try {
        let data = req.body;
        let user = req.user

        //parametros obligatorios
        let params ={
            routeDuration: data.routeDuration, 
            capacityMembers : data.capacityMembers,
            place : data.place
        }
        // datos obligatorios en la creacion 
        data.creator = user.sub

        //validar parametros
        let validaParams = validateData(params);
        if (validaParams) return res.status(403).send(validaParams)

        let findPlace = await Route.find({place: data.place});
        
        
        //creacion ruta 
        let route =  new Route(data);
        await route.save();
        if (findPlace.lenght == 0) 
        return res.send({message: 'a few steps more', route})
        else
        return res.send({message: 'a few steps more', route, findPlace})


    } catch (err) {        
        console.log(err)
        return res.status(500).send({message: 'Server error, error trying create route'})
    }
}


//Obtener Rutas 
exports.getRouteMochilero = async (req,res) =>{
    try {
        
        // find route 
        let route = await Route.find({status:true}).select('-_id -status')
        //sino existe 
        if(!route || route.lenght == 0) return res.send ({ message:'doesnt exist route, create One!'})

        return res.send ({message: route})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Server Error, try later'})
        
    }
}

//Obtener Rutas 
exports.getRouteModereator = async (req,res) =>{
    try {
        
        // find route 
       let route = await Route.find({})
        //sino existe 
        if(!route || route.lenght == 0) return res.send ({ message:'doesnt exist route'})

        return res.send ({message: route})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Server Error, try later'})
        
    }
}




