'use strict'

// Constantes modelos
const Route = require('./route.model')
const User = require('../User/user.model')

//utils 
const { validateData } = require("../utils/validate");
const fs = require('fs')
const path = require('path')

//funcion test
exports.test = async (req, res) => {
    res.send({ Message: 'hola mundo' })
}

//funcion crear Ruta(esta ruta es 'nula')
exports.createRoute = async (req, res) => {
    try {
        let data = req.body;
        let user = req.user

        //parametros obligatorios
        let params = {
            routeDuration: data.routeDuration,
            capacityMembers: data.capacityMembers,
            place: data.place
        }
        // datos obligatorios en la creacion 
        data.creator = user.sub

        //validar parametros
        let validaParams = validateData(params);
        if (validaParams) return res.status(403).send(validaParams)

        let findPlace = await Route.find({ place: data.place });


        //creacion ruta 
        let route = new Route(data);
        await route.save();
<<<<<<< HEAD
        if (findPlace.lenght == 0) 
        return res.send({message: 'a few steps more', route})
=======
        console.log(findPlace.length);
        if (findPlace.lenght == 0)
            return res.send({ message: 'a few steps more', route })
>>>>>>> dev
        else
            return res.send({ message: 'a few steps more', route, findPlace })


    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Server error, error trying create route' })
    }
}


//Obtener Rutas 
<<<<<<< HEAD
exports.getRoutesMochilero = async (req,res) =>{
    try {
        
        // find route 
        let route = await Route.find({status:true}).select(' -status')
        //sino existe 
        if(!route || route.lenght == 0) return res.send ({ message:'doesnt exist route, create One!'})

        return res.send ({route})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Server Error, try later'})
        
    }
}

//Obtener Ruta
exports.getRouteMochilero = async (req,res) =>{
    try {
        let idroute = req.params.id; 

        
        // find route 
        let route = await Route.findOne({_id:idroute,status:true}).select('-status')
        //sino existe 
        if(!route) return res.send ({ message:'doesnt exist route, create One!'})

        return res.send ({route})
=======
exports.getRouteMochilero = async (req, res) => {
    try {

        // find route 
        let route = await Route.find({ status: true }).select('-_id -status')
        //sino existe 
        if (!route || route.lenght == 0) return res.send({ message: 'doesnt exist route, create One!' })

        return res.send({ message: route })
>>>>>>> dev
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Server Error, try later' })

    }
}

//Obtener Rutas 
<<<<<<< HEAD
exports.getRoutesModereator = async (req,res) =>{
=======
exports.getRouteModereator = async (req, res) => {
>>>>>>> dev
    try {

        // find route 
        let route = await Route.find({})
        //sino existe 
        if (!route || route.lenght == 0) return res.send({ message: 'doesnt exist route' })

        return res.send({ message: route })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Server Error, try later' })

    }
}


//Agregar imagenes para rutas
exports.addImageRoutes = async (req, res) => {
    try {
        let idRoute = req.params.idRoute
        let alreadyImage = await Route.findOne({ _id: idRoute })

        let pathFile = './uploads/Route/'

        if (alreadyImage.image) fs.unlinkSync(`${pathFile}${alreadyImage.image}`)
        if (!req.files.image || !req.files.image.type) return res.status(400).send({ message: 'Havent sent image' })

        const filePath = req.files.image.path;
        const fileSplit = filePath.split('\\')
        const fileName = fileSplit[2];
        const extension = fileName.split('\.');
        const fileExt = extension[1]
        console.log(fileExt)

        if (
            fileExt == 'png' ||
            fileExt == 'jpg' ||
            fileExt == 'jpeg' ||
            fileExt == 'gif'
        ) {
            const updateUserImage = await Route.findOneAndUpdate(
                { _id: idRoute },
                { image: fileName },
                { new: true }
            )
            if (!updateUserImage) return res.status(404).send({ message: 'Route not found and not updated' });
            return res.send({ message: 'Route updated', updateUserImage })
        }
        fs.unlinkSync(filePath)
        return res.status(404).send({ message: 'File extension cannot admited' });

    } catch (e) {
        return res.status(500).send({ message: 'Error adding image' })
    }
}


//Obtener Ruta
exports.getRouteModerator = async (req,res) =>{
    try {
        let idroute = req.params.id; 

        
        // find route 
        let route = await Route.findOne({_id:idroute})
        //sino existe 
        if(!route) return res.send ({ message:'doesnt exist route, create One!'})

        return res.send ({route})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Server Error, try later'})
        
    }
}


//Obtener la imagen de la ruta
exports.getImage = async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const pathFile = `./uploads/Route/${fileName}`

        const image = fs.existsSync(pathFile);
        if (!image) return res.status(404).send({ message: 'image not found' })
        return res.sendFile(path.resolve(pathFile))
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting image' });
    }
}

