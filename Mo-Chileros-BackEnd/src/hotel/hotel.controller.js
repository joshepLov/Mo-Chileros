"use strict";

const Hotel = require("./hotel.model");

const { validateData } = require("../utils/validate");

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
    if (validateParams) return res.status(403).send(validateParams);
    // verificar si existe un hotel
    let findHotel = await Hotel.findOne({
      or: [{ name: data.name }, { address: data.address }],
    });
    if (findHotel)
      return res.status(409).send({ message: "Hotel already exist" });
    //creacion del hotel
    let hotel = new Hotel(data);
    await hotel.save();
    return res.send({ message: "hotel created succesfuly", hotel });
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
    let roomExists = await Hotel.findOne({ "room.name": data.name });
    if (!hotelExists)
      return res
        .status(404)
        .send({ message: `hotel didn't find or some data already exists` });
    if (roomExists)
      return res.status(409).send({ message: `room already exists` });
    let addRoom = await Hotel.findOneAndUpdate(
      { _id: idHotel },
      {
        $push: {
          room: data,
        },
      },
      { new: true }
    );
    if (!addRoom) return res.status(404).send({ message: "error adding room" });
    return res.send({ message: "room created", addRoom });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error adding room" });
  }
};
// obtener hoteles
exports.getHotels = async (req, res) => {
  try {
    //encontrar hoteles
    let hotels = await Hotel.find({});
    if(!hotels) return res.status(404).send({message:"hotels dont found"})
    return res.send({ hotels });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error getting hotel" });
  }
};
//obtener hotel
exports.getHotel = async (req, res) => {
  try {
    //data
    let data = req.params.id;
    //buscar datos
    let hotel = await Hotel.findOne({ _id: data }).select("-_id -status");
    //validar datos
    if (!hotel) return res.status(403).send({ message: "hotel doesnt found" });
    return res.send({ hotel });
  } catch (err) {
    console.log(err);
  }
};

exports.updateHotel= async(req,res)=>{
    try {
        //data
        let hotelId = req.params.id
        let data= req.body;
           //parametros no permitidos
        let paramsDenied = {
          status:data.status
        };
  
        const hasDeniedParams = Object.values(paramsDenied).some(
            (param) => param !== undefined
        );
        // encontrar hotel existente
        let existsHotel = await Hotel.findOne({_id:hotelId});
        // denegar parametros
        if (hasDeniedParams)
        return res
          .status(422)
          .send({ message: "Have submitted some data that cannot be updated" });
        
        if(!existsHotel) return res.status(404).send({message: 'hotel doesnt found'});
        //actualizar
        let updateHotel = await Hotel.findOneAndUpdate(
            {_id:hotelId},
            data,
            {new:true}
        )
        if(!updateHotel) return res.status(422).send({message: 'hotel doesnt updated'})
        return res.send({message: 'hotel updated', updateHotel})
        
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'error updating hotel'})
    }
}
//desactivar hotel
exports.desactivateHotel = async (req, res) => {
  try {
    //data
    let hotelId = req.params.id;
    let hotelexists = await Hotel.findOne({_id: hotelId})
    //comprobacion de hotel
    if(!hotelexists) return res.status(404).send({message:'hotel doesnt found'})
    let hotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      { status: false },
      { new: true }
    );
    if (!hotel) return res.status(403).send({ message: "hotel doesnt desactivated" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error desactivate hotel" });
  }
};
