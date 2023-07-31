'use strict'

const Hotel = require('../hotel/hotel.model')
const HotelReservation = require('./reservationHotel.model')
const TransportReservation = require('../reservationTransport/reservationTransport.model')
const Travel = require('../travel/travel.model')
const User = require('../User/user.model')
const Bill = require('../bill/bill.model')
const user = ['name']
const hotel = ['name', 'address']
const room = ['name', 'price']

const { validateData } = require("../utils/validate");


exports.test = async (req, res) => {
  res.send({ message: "test hotel is running" });
};

// creacion de reservacion hotel
/* exports.createHotel = async (req, res) => {
  try {
    // obtener valores de quien va realizar la operacion
    let travelId = req.params.travelId;
    let hotelId = req.params.hotelId;
    let roomId = req.params.room;
    let dataUser = req.user
    let data = req.body
    let dateUser = new Date(data.date)
    const datesArray = Array.isArray(data.date) ? data.date : [data.date];
    //datos obligatorios
    let params = {
      date: data.date
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

    //buscar datos viaje y miembro /hotel
    let existsTravel = await Travel.findOne({ _id: travelId, 'members.user': dataUser.sub })
    let existsHotel = await Hotel.findOne({ _id: hotelId, 'room._id': roomId }, { 'room.$': 1 })
    let statusRoom = await HotelReservation.findOne({
      room: roomId, dates: { $elemMatch: { date: dateUser } }
    })
    let reservationExists = await HotelReservation.findOne({ hotel: hotelId, user: dataUser.sub })

    //setear datos date 
    let obtainDate = existsTravel.dateEnd
    let limitDate = obtainDate.setDate(obtainDate.getDate() - 1)

    // validacion de datos
    let validateParams = validateData(params);
    if (validateParams) return res.status(403).send(validateParams);

    //si ya tiene una reservacion 

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

    // verificar si existe un hotel
    if (!existsHotel)
      return res.status(409).send({ message: "Hotel doesnt found exist" });

    //verificar si el usuario ya esta registrado en ese hotel
    if (reservationExists)
      return res.status(422).send({ message: 'you already reservate in this hotel' })
    //verificar si la habitacion esta en uso
    if (statusRoom)
      return res.status(422).send({ message: 'this date is in use' })

    //verifivar si esta enfechas estipuladas 
    if (dateUser <= existsTravel.dateStart || dateUser >= limitDate) {
      return res.status(418).send({ message: 'this date cannot be use for your travel' })
    }

    //datos obligatorios reservatin
    data.price = existsHotel.room[0].price
    data.user = dataUser.sub
    data.room = roomId
    data.travel = travelId
    data.hotel = hotelId

    //creacion del hotel
    let reservation = new HotelReservation(data);
    reservation.dates = datesArray.map(dateString => ({ date: new Date(dateString) }));
    await reservation.save();
    return res.send({ message: "hotel created succesfuly", reservation });

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Error trying save reservation, try later" });
  }
};

 */

//Reservacion Hotel
exports.reservacion = async (req, res) => {
  try {
    //Datos a recivir
    let idTravel = req.params.idTravel
    let idHotel = req.params.idHotel
    let idRoom = req.params.idRoom
    let user = req.user
    let data = req.body

    //Buscar el transporte
    let priceTravel  = await TransportReservation.findOne({ travel: idTravel })


    //Verificar que exista el viaje y este agregado como un miembro
    let existTrabel = await Travel.findOne({ _id: idTravel, 'members.user': user.sub })
    if (!existTrabel) {
      console.log('travel error');
    return req.status(403).send({ message: 'please check your credentials' })}

    //Verificar que el hotel a reservar exista y la habitacion
    let existHotel = await Hotel.findOne({ _id: idHotel, 'room._id': idRoom }, { 'room.$': 1 })
    if (!existHotel){ 
      console.log('hotel');
      return res.status(409).send({ message: "Hotel doesnt found exist" });}

    //Fechas de la reservacion
    const dateNow = new Date()
    const startDate = existTrabel.dateStart
    const endDate = existTrabel.dateEnd

    // //Las fechas de reservacion deven de ser igual a las fechas en las que iniciara y terminara el viaje  endDate,existTrabel.dateEnd
    // if (startDate ==! existTrabel.dateStart ){
    //   console.log(startDate, existTrabel.dateStart)
    //   console.log('iguales');
    //   return res.status(418).send({ message: 'Las fechas de reservacion deven de ser iguales a las del viaje' })
    // }


    //La fecha final no puede ser menor a la inicial
    if (endDate < startDate) return res.status(418).send({ message: 'La fecha final deve ser igual o mayor a la inicial' })

    //Verificar que la habitacion este disponible segun la fecha ingresada por el user
    let room = await HotelReservation.find({ room: idRoom })

    let validacion = await verificarFechas(room, startDate, endDate)
    if (validacion === true) return res.status(418).send({ message: 'These dates are already taken' })

    console.log(existHotel)

    data.travel = idTravel
    data.hotel = idHotel
    data.room = idRoom
    data.user = user.sub
    data.dateStart = startDate
    data.dateFinal = endDate

    if(priceTravel){
      price= priceTravel.price
      data.price = existHotel.room[0].price
    }
    console.log(existHotel)

    //Verificar si existe una factura
    let bill = await Bill.findOne({ travel: idTravel, user: user.sub })
    if (bill) {
      let pricePerson = price / existTrabel.members.length
      let totalPrice = data.price + pricePerson

      let updateBill = await Bill.findOneAndUpdate(
        { travel: idTravel, user: user.sub },
        {
          roomPrice: data.price,
          transportPrice: pricePerson,
          totalPrice
        },
        { new: true }
      )

      let reservacion = new HotelReservation(data)
      await reservacion.save()
      return res.send({ message: 'Se ha agregado la resrvacion' })

    }

    let reservacion = new HotelReservation(data)
    await reservacion.save()
    return res.send({ message: 'Se ha agregado la resrvacion' })

  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: "Error trying save reservation, try later" });
  }
}



//Funcion para verificar las fechas
const verificarFechas = async (room, startDate, endDate) => {
  try {
    if (room.length !== 0) {
      for (let i = 0; i <= room.length; i++) {
        if (startDate <= room[i].dateFinal) return true
      }
      return false

    }
    return false
  } catch (e) {
    console.log(e)
  }
}


//Obtener todas las reservaciones 
exports.getReservations = async (req, res) => {
  try {
    let reservations = await HotelReservation.find()
    return res.send({ reservations })
  } catch (e) {
    return res.status(500).send({ message: 'Error obtaining reservations' })
  }
}

//Obtener una sola reservacion 
exports.getReservationId = async (req, res) => {
  try {
    let reservationId = req.params.id
    let existReservation = await HotelReservation.findOne({ _id: reservationId })
    if (!existReservation) return res.status(404).send({ message: 'Reservation not found' })
    return res.send({ existReservation })
  } catch (e) {
    return res.status(500).send({ message: 'Error obtaining the reservation' })
  }
}


//Obtener reservacion de quien este logeado
exports.getReservationLogged = async (req, res) => {
  try {
    let { sub } = req.user
    let existUser = await HotelReservation.findOne({ user: sub })
      .populate('user', user)
      .populate('hotel', hotel)
    return res.send({ existUser })
  } catch (e) {
    return res.status(500).send({ message: "Error obtaining the reservation" })
  }
}


//Cancelar Reservacion
exports.cancelReservation = async (req, res) => {
  try {
    //Parametros
    let idReservation = req.params.id
    let idTravel = req.params.idTravel
    let { sub } = req.user

    //Buscar reservacion de transporte
    let { price } = await TransportReservation.findOne({ travel: idTravel })

    //Verificar que este en el viaje
    let existTrabel = await Travel.findOne({ _id: idTravel, 'members.user': sub })
    if (!existTrabel) return req.status(403).send({ message: 'please check your credentials' })

    //Buscar la fecha del viaje
    const dateNow = new Date()

    let { dateStart } = await Travel.findOne({ _id: idTravel })

    dateNow.setHours(0, 0, 0, 0)
    dateStart.setHours(0, 0, 0, 0)

    console.log(Date.parse(dateNow), Date.parse(dateStart))
    if (Date.parse(dateNow) === Date.parse(dateStart)) return res.status(422).send({ message: 'No puedes cancelar la reservacion' })


    //Buscar si exite una factura
    let bill = await Bill.findOne({ travel: idTravel, user: sub })
    if (bill) {
      let roomPrice = 0
      let pricePerson = price / existTrabel.members.length
      let totalPrice = pricePerson

      let updateBill = await Bill.findOneAndUpdate(
        { travel: idTravel, user: sub },
        {
          roomPrice,
          transportPrice: pricePerson,
          totalPrice
        },
        { new: true }
      )

      let deleteReservation = await HotelReservation.findOneAndDelete({ _id: idReservation })
      if (!deleteReservation) return res.status(400).send({ message: 'No se pudo cancelar la reservacion' })
      return res.send({ message: 'Reservacion cancelada' })

    }


    let deleteReservation = await HotelReservation.findOneAndDelete({ _id: idReservation })
    if (!deleteReservation) return res.status(400).send({ message: 'No se pudo cancelar la reservacion' })
    return res.send({ message: 'Reservacion cancelada' })

  } catch (e) {
    return res.status(500).send({ message: 'Error when canceling the reservation' })
  }
}


//Update reservacion
exports.updateReservation = async (req, res) => {
  try {
    let idReservation = req.params.idReservation
    let idTravel = req.params.idTravel
    let idHotel = req.params.idHotel
    let idRoom = req.params.idRoom
    let { sub } = req.user
    let data = req.body

    //Buscar el transporte
    let { price } = await TransportReservation.findOne({ travel: idTravel })


    //Verificar que este en el viaje
    let existTrabel = await Travel.findOne({ _id: idTravel, 'members.user': sub })
    if (!existTrabel) return req.status(403).send({ message: 'please check your credentials' })



    //Obtener la fecha que inicia el viaje
    let dateNow = new Date()
    let { dateStart, dateEnd } = await Travel.findOne({ _id: idTravel })

    let startDate = dateStart
    let endDate = dateEnd

    //Pasar fechar a hora 00:00:00
    dateNow.setHours(0, 0, 0, 0)
    dateStart.setHours(0, 0, 0, 0)

    //Verificar que no se trate de modigicar en el dia del viaje
    if (Date.parse(dateNow) === Date.parse(dateStart))
      return res.status(400).send({ message: 'No puedes modificar la reservacion este dia' })


    //Verificar que exista el hotel y la Habitacion en el hotel
    let existHotel = await Hotel.findOne({ _id: idHotel, 'room._id': idRoom }, { 'room.$': 1 })
    if (!existHotel) return res.status(409).send({ message: "Hotel doesnt found exist" });

    //Verificar que la habitacion este disponible segun la fecha ingresada por el user
    let room = await HotelReservation.find({ room: idRoom })

    let validacion = await verificarFechas(room, startDate, endDate)
    if (validacion === true) return res.status(418).send({ message: 'These dates are already taken' })


    //Modificar la reservacion
    let updateReservation = await HotelReservation.findOneAndUpdate(
      { _id: idReservation },
      {
        room: idRoom,
        price: existHotel.room[0].price
      },
      { new: true }
    )

    //Buscar si existe una factura
    let bill = await Bill.findOne({ travel: idTravel, user: sub })
    if (bill) {
      let pricePerson = price / existTrabel.members.length
      let totalPrice = pricePerson + existHotel.room[0].price
      let updateBill = await Bill.findOneAndUpdate(
        { travel: idTravel, user: sub },
        {
          roomPrice: existHotel.room[0].price,
          transportPrice: pricePerson,
          totalPrice
        },
        { new: true }
      )

      console.log(updateBill)

      if (!updateReservation) return res.status(400).send({ message: 'No se pudo modificar la reservacion' })
      return res.send({ message: 'Reservacion modificada' })
    }

    if (!updateReservation) return res.status(400).send({ message: 'No se pudo modificar la reservacion' })
    return res.send({ message: 'Reservacion modificada' })

  } catch (e) {
    console.log(e)
    return res.status({ message: 'Error modifying the reservation' })
  }
}
