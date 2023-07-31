"use strict";

const Transport = require("./transport.model");

const { validateData } = require("../utils/validate");
const fs = require('fs')
const path = require('path')

exports.test = async (req, res) => {
  res.send({ message: "test transport is running" });
};

// creacion del transport
exports.createTransport = async (req, res) => {
  try {
    let data = req.body;
    //preguntar si esta funcion puede servir para la seguridad y el control de la aplicacion
    // obtener valores de quien va realizar la operacion
    let dataId = req.params.id;

    //datos obligatorios
    let params = {
      name: data.name,
      type: data.type,
      description: data.description,
      price: data.price, 
      capacity: data.price,
      typeVehicle: data.typeVehicle
    };

    // validacion de datos
    let validateParams = validateData(params);
    if (validateParams) return res.status(403).send(validateParams);


    // verificar si existe un transporte()
    let findTrasnport = await Transport.findOne({name: data.name  });
    if (findTrasnport)
      return res.status(409).send({ message: "Transport already exist" });

    //creacion del tranposrte
    let transport = new Transport(data);
    await transport.save();
    return res.send({ message: "transport created succesfuly", transport });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Error trying save transport, try later" });
  }
};

// obtener TRANSPORTE
exports.getTransportsMochileros = async (req, res) => {
  try {
   
    //encontrar transportes
    let transport = await Transport.find({status:true}).select(' -status');
      if (!transport) return res.status(404).send({ message: "transport dont found" });
    // verificar si transport viene vacio
      if (transport.length == 0)  return res.status(404).send({ message: "transport dont found" });
    return res.send({ transport });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error getting transport" });
  }
};

//obtener transporte para mochileros
exports.getTransportMochileros = async (req, res) => {
  try {
    //data
    let data = req.params.id;

    //buscar datos
    let tranposrt = await Transport.findOne({ _id: data, status: true }).select("-_id -status");

    //validar datos
      if (!tranposrt)
        return res.status(403).send({ message: "transporte doesnt found" });
    return res.send({ tranposrt });
  } catch (err) {
    console.log(err);
  }
};


// obtener transporte para moderadores
exports.getTransportsModerator = async (req, res) => {
  try {
    //encontrar tranpsortes
    let tranposrts = await Transport.find({});
      if (!tranposrts) return res.status(404).send({ message: "transport dont found" });
    return res.send({ tranposrts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error getting transport" });
  }
};

//obtener transport para moderadores
exports.getTransportModerator = async (req, res) => {
  try {
    //data
    let data = req.params.id;
    //buscar datos
    let tranposrt = await Transport.findOne({ _id: data});

    //validar datos
      if (!tranposrt)
        return res.status(403).send({ message: "transport doesnt found" });
    return res.send({ tranposrt });
  } catch (err) {
    console.log(err);
  }
};


//actualizar Transport
exports.updateTransport = async (req, res) => {
  try {
    //data
    let transportId = req.params.id;
    let data = req.body;

    //parametros no permitidos
    let paramsDenied = {
      status: data.status,
      _id: data.id
    };
    const hasDeniedParams = Object.values(paramsDenied).some(
      (param) => param !== undefined
    );

    // encontrar transport existente
    let existsTransport = await Transport.findOne({ _id: transportId });
    let nameExists = await Transport.findOne({name: data.name})
    if(nameExists) return res.status(409).send({message: 'transport already exists'})
  
    // verificar si existe un transporte con los parametros enviados
       let findTransport = await Transport.findOne({name:data.name });
      if (findTransport)
        return res.status(409).send({ message: "Transport already exist" });
    
    // denegar parametros
    if (hasDeniedParams)
      return res
        .status(422)
        .send({ message: "Have submitted some data that cannot be updated" });

    if (!existsTransport)
      return res.status(404).send({ message: "transport doesnt found" });

    //actualizar
    let updateTranspor = await Transport.findOneAndUpdate(
      { _id: transportId },
      data,
      { new: true });
    
    //verificar actualizacion
    if (!updateTranspor)
      return res.status(422).send({ message: "transport doesnt updated" });
    //mostrar actualizacoin 
    return res.send({ message: "transport updated", updateTranspor });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error updating transport" });
  }
};

//desactivar transport
exports.desactivateTransport = async (req, res) => {
  try {
    //data
    let tranposrtId = req.params.id;
    let transportExists = await Transport.findOne({ _id: tranposrtId });

    //comprobacion de transport
    if (!transportExists)
      return res.status(404).send({ message: "transport doesnt found" });
    let tranposrt = await Transport.findOneAndUpdate(
      { _id: tranposrtId },
      { status: false },
      { new: true }
    );

    //verificar desactivacion
    if (!tranposrt)
      return res.status(403).send({ message: "transport doesnt desactivated" });
    //mostrar desactivacion
    return res.send({tranposrt})
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error desactivate transport" });
  }
};



//activar 
// transport
exports.activateTransport = async (req, res) => {
  try {
    //data
    let tranposrtId = req.params.id;
    let tranposrtExists = await Transport.findOne({ _id: tranposrtId });

    //comprobacion de transport
    if (!tranposrtExists)
      return res.status(404).send({ message: "transport doesnt found" });
    let tranposrt = await Transport.findOneAndUpdate(
      { _id: tranposrtId },
      { status: true },
      { new: true }
    );
    
    //verificar desactualizacion
    if (!tranposrt)
      return res.status(403).send({ message: "tranpsort doesnt desactivated" });
  //mostrar
    return res.send({tranposrt})
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error activate transport" });
  }
};


//agregar imagen a transporte 

exports.addImage = async(req, res)=>{
  try{
      const transportId = req.params.id; 
      const alreadyImage = await Transport.findOne({_id: transportId})
   
      console.log(alreadyImage);
      let pathFile = './uploads/Transport/'
   
      console.log(req.files.image);
      if(alreadyImage.image) fs.unlinkSync(`${pathFile}${alreadyImage.image}`) 
      console.log(alreadyImage.image)
      if(!req.files.image || !req.files.image.type) return res.status(400).send({message: 'Havent sent image'})
      
      const filePath = req.files.image.path; 
      const fileSplit = filePath.split('\\') 
      const fileName = fileSplit[2];
      const extension = fileName.split('\.');
      const fileExt = extension[1] 
      console.log(fileExt)

      if(
          fileExt == 'png' || 
          fileExt == 'jpg' || 
          fileExt == 'jpeg' || 
          fileExt == 'gif'
      ){
          const updateTransportImg = await Transport.findOneAndUpdate(
              {_id: transportId}, 
              {image: fileName}, 
              {new: true}
          )
          if(!updateTransportImg) return res.status(404).send({message: 'transport not found and not updated'});
          return res.send({message: 'transport updated', updateTransportImg})
      }
      fs.unlinkSync(filePath)
      return res.status(404).send({message: 'File extension cannot admited'});
      

  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error adding image', err})
  }
}

//obtener imagen 
exports.getImage = async(req, res)=>{
  try{
      const fileName = req.params.fileName;
      const pathFile = `./uploads/Transport/${fileName}`

      const image = fs.existsSync(pathFile);
      if(!image) return res.status(404).send({message: 'image not found'})
      return res.sendFile(path.resolve(pathFile))
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error getting image'});
  }
}