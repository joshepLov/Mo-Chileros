"use strict";

const Hotel = require("./hotel.model");

const { validateData } = require("../utils/validate");
const fs = require('fs')
const path = require('path')

exports.test = async (req, res) => {
  res.send({ message: "test hotel is running" });
};

// creacion del hotel
exports.createHotel = async (req, res) => {
  try {
    let data = req.body;
    //preguntar si esta funcion puede servir para la seguridad y el control de la aplicacion
    // obtener valores de quien va realizar la operacion
    let dataId = req.params.id;

    //datos obligatorios
    let params = {
      name: data.name,
      address: data.address,
      description: data.description,
    };

    // validacion de datos
    let validateParams = validateData(params);
    if (validateParams) {
      console.log('aqui pasa algo');
      return res.status(403).send(validateParams);
}
    // verificar si existe un hotel
    let findHotel = await Hotel.findOne({
      or: [{ name: data.name }, { address: data.address }],
    });
    if (findHotel)
      return res.status(409).send({ message: "Hotel already exist" });

    //creacion del hotel
    let hotel = new Hotel(data);
    await hotel.save();
    return res.send({ hotel });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Error trying save hotel, try later" });
  }
};

// creacion de habitacion en hotel
exports.addRoom = async (req, res) => {
  try {
    //data
    let idHotel = req.params.id;
    let data = req.body;

    console.log(data);
    // validacion de parametros
    let params = {
      name: data.name,
      capacity: data.capacity,
      price: data.price,
    };
    let validateParams = validateData(params);
    if (validateParams) return res.status(403).send(validateParams);

    // verificar si existen parametros
    let hotelExists = await Hotel.findOne({ _id: idHotel });
    let roomExists = await Hotel.findOne({ _id: idHotel,"room.name": data.name });
    if (!hotelExists)
      return res
        .status(404)
        .send({ message: `hotel didn't find or some data already exists` });
    if (roomExists)
      return res.status(409).send({ message: `room already exists` });

    //añadir habitacion
    let addRoom = await Hotel.findOneAndUpdate(
      { _id: idHotel },
      {
        $push: {
          room: data,
        },
      },
      { new: true }
    );
    // verificar actualizacion 
    if (!addRoom) return res.status(404).send({ message: "error adding room" });
    return res.send({ message: "room created", addRoom });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error adding room" });
  }
};

// obtener hoteles
exports.getHotelsMochileros = async (req, res) => {
  try {
   
    //encontrar hoteles
    let hotels = await Hotel.find({status:true}).select(' -status');
      if (!hotels) return res.status(404).send({ message: "hotels dont found" });
    // verificar si hotel viene vacio
      if (hotels.length == 0)  return res.status(404).send({ message: "hotels dont found" });
    return res.send({ hotels });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error getting hotel" });
  }
};

//obtener hotel para mochileros
exports.getHotelMochileros = async (req, res) => {
  try {
    //data
    let data = req.params.id;

    //buscar datos
    let hotel = await Hotel.findOne({ _id: data, status: true }).select("-_id -status");

    //validar datos
      if (!hotel)
        return res.status(403).send({ message: "hotel doesnt found" });
    return res.send({ hotel });
  } catch (err) {
    console.log(err);
  }
};


// obtener hoteles para moderadores
exports.getHotelsModerator = async (req, res) => {
  try {
    //encontrar hoteles
    let hotels = await Hotel.find({});
      if (!hotels) return res.status(404).send({ message: "hotels dont found" });
    return res.send({ hotels });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error getting hotel" });
  }
};

//obtener hotel para mochileros
exports.getHotelModerator = async (req, res) => {
  try {
    //data
    let data = req.params.id;
    //buscar datos
    let hotel = await Hotel.findOne({ _id: data});

    //validar datos
      if (!hotel)
        return res.status(403).send({ message: "hotel doesnt found" });
    return res.send({ hotel });
  } catch (err) {
    console.log(err);
  }
};


// obtener habitaciones 
exports.getRooms = async (req, res) =>{
  try {
    //fata
    let hotelId = req.params.id 
    
    //encontrar hotel 
    let hotel = await Hotel.findOne({ _id: hotelId, status: true});
    if (!hotel)
    return res.status(403).send({ message: "hotel doesnt found" });
    //encontrar habitacion
    let hotels = await Hotel.find({ 'room.status': true})
   
    // encontrar habitaciones y guardarlas para mostrarlas
    let foundRooms = [];
    hotels.forEach((hotel) => {
      const rooms = hotel.room.filter((room) => room.status === true);
      foundRooms.push(...rooms);
    });

    // verificar que si haya habitaciones
    if(foundRooms.length == 0)return res.status(404).send({message: 'rooms dont found'})
    
    //mostrar
    return res.send({foundRooms})
  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'error searching rooms'})
  }
}

exports.getRoom = async(req,res)=>{
  try {
    //data
    let hotelId = req.params.id
    let roomId = req.params.roomId
    
    //habitacion existente
    let existHotel = await Hotel.findOne({_id: hotelId, status:true})
    if(!existHotel)  return res.status(404).send({message: 'hotel doesnt found'})
    let existsRoom = await Hotel.findOne({'room._id':roomId})
    if(!existsRoom) return res.status(404).send({message: 'room doesnt found'})
    
    //encontrar habitacion
    let findRoom = await Hotel.findOne({'room._id': roomId, 'room.status': true}, {'room.$': 1})

    //verificar habitacion
    if(!findRoom)  return res.status(404).send({message: 'room doesnt found'})

    //mostrar habitacion
    return res.send({message: findRoom})
  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'room doesnt found'})
  }
}

exports.getRoomModerator = async(req,res)=>{
  try {
    //data
    let hotelId = req.params.id
    let roomId = req.params.roomId

    //habitacion existente
    let existHotel = await Hotel.findOne({_id: hotelId})
    if(!existHotel)  return res.status(404).send({message: 'hotel doesnt found'})
    let existsRoom = await Hotel.findOne({'room._id':roomId})
    if(!existsRoom) return res.status(404).send({message: 'room doesnt found'})
    
    //encontrar habitacion
    let findRoom = await Hotel.findOne({'room._id': roomId}, {'room.$': 1})
    if(!findRoom)  return res.status(404).send({message: 'room doesnt found'})
    return res.send({message: findRoom})
  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'room doesnt found'})
  }
}


// obtener habitaciones Moderator
exports.getRoomsModerator = async (req, res) =>{
  try {
    //data
    let hotelId = req.params.id 
    
    //encontrar hotel
    let hotel = await Hotel.find({ _id: hotelId});
    if (!hotel)
    return res.status(403).send({ message: "hotel doesnt found" });
    let rooms = await Hotel.find({ 'room.status':true})

    //verificar que existan habitacinoes
    if(rooms.length == 0)return res.status(404).send({message: 'rooms dont found'})
    return res.send({message: rooms})
  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'error searching rooms'})
  }
}

//actualizar Hotel
exports.updateHotel = async (req, res) => {
  try {
    //data
    let hotelId = req.params.id;
    let data = req.body;

    //parametros no permitidos
    let paramsDenied = {
      status: data.status,
    };
    const hasDeniedParams = Object.values(paramsDenied).some(
      (param) => param !== undefined
    );

    // encontrar hotel existente
    let existsHotel = await Hotel.findOne({ _id: hotelId });
    let nameExists = await Hotel.findOne({name: data.name})
    if(nameExists) return res.status(409).send({message: 'hotel already exists'})
  
    // verificar si existe un hotel con los parametros enviados
       let findHotel = await Hotel.findOne({
        or: [{ name: data.name }, { address: data.address }],
      });
      if (findHotel)
        return res.status(409).send({ message: "Hotel already exist" });
    
    // denegar parametros
    if (hasDeniedParams)
      return res
        .status(422)
        .send({ message: "Have submitted some data that cannot be updated" });

    if (!existsHotel)
      return res.status(404).send({ message: "hotel doesnt found" });

    //actualizar
    let updateHotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      data,
      { new: true });
    
    //verificar actualizacion
    if (!updateHotel)
      return res.status(422).send({ message: "hotel doesnt updated" });
    //mostrar actualizacoin 
    return res.send({ message: "hotel updated", updateHotel });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error updating hotel" });
  }
};

//actualizar habitacion 
exports.updateRoom = async (req,res)=>{
try {
  //data
  let roomId= req.params.id
  let hotelId = req.params.hotelId
  let data = req.body;

  //parametros no permitidos
  let paramsDenied = {
    status: data.status,
    _id: data.id
  };
  const hasDeniedParams = Object.values(paramsDenied).some(
    (param) => param !== undefined
  );
  
  //habitacion existente
  let hotelexists = await Hotel.findOne({_id: hotelId})
  if (!hotelexists) return res.status(404).send({message: 'hotel doesnt found'})
  let existsRoom = await Hotel.findOne({'room._id':roomId})
  let nameExists = await Hotel.findOne({'room.name': data.name})
  if(nameExists) return res.status(409).send({message: 'room already exists'})
  if(!existsRoom) return res.status(404).send({message: 'room doesnt found'})
 
 
  //actualizar habitacion
  let updatedRoom = await Hotel.findOneAndUpdate(
    { 'room._id': roomId },
    {
      $set: {
        'room.$.name': data.name,
        'room.$.capacity': data.capacity,
        'room.$.price': data.price,
      },
    },
    { new: true }
  );

  //encontrar y mostrar habitacion 
  const findRoom = updatedRoom.room.find(room => room._id.toString() === roomId.toString())
  return res.send({message:findRoom })

} catch (err) {
  console.log(err);
  return res.status(500).send({message:'error updating room'})
} 
}

//desactivar hotel
exports.desactivateHotel = async (req, res) => {
  try {
    //data
    let hotelId = req.params.id;
    let hotelexists = await Hotel.findOne({ _id: hotelId });

    //comprobacion de hotel
    if (!hotelexists)
      return res.status(404).send({ message: "hotel doesnt found" });
    let hotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      { status: false },
      { new: true }
    );

    //verificar desactivacion
    if (!hotel)
      return res.status(403).send({ message: "hotel doesnt desactivated" });
    //mostrar desactivacion
    return res.send({hotel})
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error desactivate hotel" });
  }
};

// desactivar room 
exports.desactivateRoom = async(req, res) =>{
  try {

  //data
    let hotelId = req.params.id
    let roomId = req.params.roomId
    
  //habitacion existente
  let existHotel = await Hotel.findOne({_id: hotelId})
  if(!existHotel)  return res.status(404).send({message: 'hotel doesnt found'})
  let existsRoom = await Hotel.findOne({'room._id':roomId})
  if(!existsRoom) return res.status(404).send({message: 'room doesnt found'})

  //desactivar habitacion
  let desactivate = await Hotel.findOneAndUpdate(
    { 'room._id': roomId },
    {
      $set: {
        'room.$.status': false,
      },
    },
    { new: true }
  );

  //encontrar habitacion
  const findRoom = desactivate.room.find(room => room._id.toString() === roomId.toString())

  //mostrar
  return res.send({message: findRoom})

  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'problem desactivate room'})
  }
}


//activar 
// hotel
exports.activateHotel = async (req, res) => {
  try {
    //data
    let hotelId = req.params.id;
    let hotelexists = await Hotel.findOne({ _id: hotelId });

    //comprobacion de hotel
    if (!hotelexists)
      return res.status(404).send({ message: "hotel doesnt found" });
    let hotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      { status: true },
      { new: true }
    );
    
    //verificar desactualizacion
    if (!hotel)
      return res.status(403).send({ message: "hotel doesnt desactivated" });
  //mostrar
    return res.send({hotel})
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error desactivate hotel" });
  }
};

// desactivar room 
exports.activateRoom = async(req, res) =>{
  try {

  //data
    let hotelId = req.params.id
    let roomId = req.params.roomId
    console.log(hotelId, roomId);
    
  //habitacion existente
  let existHotel = await Hotel.findOne({_id: hotelId})
  if(!existHotel)  return res.status(404).send({message: 'hotel doesnt found'})
  let existsRoom = await Hotel.findOne({'room._id':roomId})
  if(!existsRoom) return res.status(404).send({message: 'room doesnt found'})
  
  //actualizar habitacion
  let desactivate = await Hotel.findOneAndUpdate(
    { 'room._id': roomId },
    {
      $set: {
        'room.$.status': true,
      },
    },
    { new: true }
  );

  //encontrar habitacion
  const findRoom = desactivate.room.find(room => room._id.toString() === roomId.toString())

  //mostrar habitacion
  return res.send({message: findRoom})

  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'problem desactivate room'})
  }
}

//agregar imagen a hotel 

exports.addImage = async(req, res)=>{
  try{
      const hotelId = req.params.id; 
      const alreadyImage = await Hotel.findOne({_id: hotelId})
   
      console.log(alreadyImage);
      let pathFile = './uploads/Hotel/'
   
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
          const updateHotelImage = await Hotel.findOneAndUpdate(
              {_id: hotelId}, 
              {image: fileName}, 
              {new: true}
          )
          if(!updateHotelImage) return res.status(404).send({message: 'hotel not found and not updated'});
          return res.send({message: 'hotel updated', updateHotelImage})
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
      const pathFile = `./uploads/Hotel/${fileName}`

      const image = fs.existsSync(pathFile);
      if(!image) return res.status(404).send({message: 'image not found'})
      return res.sendFile(path.resolve(pathFile))
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error getting image'});
  }
}

//image habitacion 

exports.addImageRoom = async(req, res)=>{
  try{
      const roomlId = req.params.id; 
      const alreadyImage = await Hotel.findOne({'room._id': roomlId})
   
      console.log(alreadyImage);
      let pathFile = './uploads/Rooms/'
   
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
          const updatedRoomImage = await Hotel.findOneAndUpdate(
              {'room._id': roomlId}, 
              {'room.$.image':fileName}, 
              {new: true}
          )
          if(!updatedRoomImage) return res.status(404).send({message: 'room not found and not updated'});
          return res.send({message: 'room updated', updatedRoomImage})
      }
      fs.unlinkSync(filePath)
      return res.status(404).send({message: 'File extension cannot admited'});
      

  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error adding image', err})
  }
}

//obtener imagen habitacion
exports.getImageRoom = async(req, res)=>{
  try{
      const fileName = req.params.fileName;
      const pathFile = `./uploads/Rooms/${fileName}`

      const image = fs.existsSync(pathFile);
      if(!image) return res.status(404).send({message: 'image not found'})
      return res.sendFile(path.resolve(pathFile))
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error getting image'});
  }
}