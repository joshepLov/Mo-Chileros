'use strict'

const Hotel = require('../hotel/hotel.model')
const HotelReservation = require('./reservationHotel.model')
const Travel = require('../travel/travel.model')
const User = require('../User/user.model')

const { validateData } = require("../utils/validate");


    exports.test = async (req, res) => {
       res.send({ message: "test hotel is running" });
    };
  
  // creacion de reservacion hotel
exports.createHotel = async (req, res) => {
    try {
        // obtener valores de quien va realizar la operacion
        let travelId = req.params.travelId;
        let hotelId = req.params.hotelId;
        let roomId = req.params.room;
        let dataUser = req.user
        let data = req.body
        let dateUser = new Date(data.date)
        const datesArray = []

        for (let key in data) {
          datesArray.push({ field: key, value: data[key] });
        }

        console.log(datesArray);

        //datos obligatorios
        let params = {
            date : data.date
        };
        
        //buscar datos viaje y miembro /hotel
        let existsTravel = await Travel.findOne({_id: travelId , 'members.user': dataUser.sub})
        let existsHotel = await Hotel.findOne ({_id: hotelId , 'room._id': roomId},{'room.$': 1})
        let statusRoom = await HotelReservation.findOne({   
            room: roomId,  dates: { $elemMatch: { date: dateUser } }  
        })
        let reservationExists = await HotelReservation.findOne({hotel: hotelId, user: dataUser.sub})
        
        //setear datos date 
        let obtainDate = existsTravel.dateEnd
        let limitDate = obtainDate.setDate(obtainDate.getDate()-1)

        // validacion de datos
        let validateParams = validateData(params);
        if (validateParams) return res.status(403).send(validateParams);

        //si ya tiene una reservacion 
   
        //verificar is existe viaje y usuario en el viaje 
        if(!existsTravel)
        return res.status(418).send({message: 'please check your credentials'})

        // verificar si existe un hotel
        if (!existsHotel)
        return res.status(409).send({ message: "Hotel doesnt found exist" });

        //verificar si el usuario ya esta registrado en ese hotel
        if(reservationExists)
        return res.status(422).send({message: 'you already reservate in this hotel'})
        //verificar si la habitacion esta en uso
        if(statusRoom)
        return res.status(422).send({message: 'this date is in use'})

        //verifivar si esta enfechas estipuladas 
        if(dateUser <= existsTravel.dateStart || dateUser >= limitDate){
          return res.status(418).send({message: 'this date cannot be use for your travel'})
        }

        //datos obligatorios reservatin
        data.price = existsHotel.room[0].price
        data.user = dataUser.sub
        data.room = roomId
        data.travel= travelId
        data.hotel = hotelId
        
        //creacion del hotel
        let reservation = new HotelReservation(data);
        reservation.dates = datesArray //[{date:datesArray}];
        await reservation.save();
        return res.send({ message: "hotel created succesfuly", reservation });

    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Error trying save reservation, try later" });
    }
};