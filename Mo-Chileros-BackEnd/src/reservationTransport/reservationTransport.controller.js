'use strict'

const Travel = require('../travel/travel.model')
const Transport = require('../transport/transport.model')
const User = require('../User/user.model')
const ReservationTransport = require('./reservationTransport.model')
const { verificarFechas } = require('../reservationHotel/reservationHotel.controller')


exports.test = async (req, res) => {
    return res.send({ message: 'Conexion' })
}


//Crear Reservacion
exports.createReservation = async (req, res) => {
    try {
        let idTravel = req.params.idTravel
        let idTransport = req.params.idTransport
        let { sub } = req.user
        let data = req.body


        //Verificar que sea el coordinador del viaje quien reserve el transporte
        let travel = await Travel.findOne({ _id: idTravel, cordinator: sub })
        if (!travel) return res.status(401).send({ message: 'You may not be on this trip' })


        //Verificar que esxista el transporte
        let transpor = await Transport.findOne({ _id: idTransport })
        if (!transpor) return res.status(404).send({ message: 'Transport not found' })

        //Fechas de la reservacion
        const dateNow = new Date()
        const startDate = new Date(data.dateStart)
        const endDate = new Date(data.dateFinal)

        //Las fechas de reservacion deven de ser igual a las fechas en las que iniciara y terminara el viaje
        if (Date.parse(startDate) !== Date.parse(travel.dateStart) || Date.parse(endDate) !== Date.parse(travel.dateEnd))
            return res.status(418).send({ message: 'Las fechas de reservacion deven de ser iguales a las del viaje' })

        //La fecha final no puede ser menor a la inicial
        if (endDate < startDate) return res.status(418).send({ message: 'La fecha final deve ser igual o mayor a la inicial' })

        //Verificar que la habitacion este disponible segun la fecha ingresada por el user
        let transporte = await ReservationTransport.find({ transport: idTransport })

        let validacion = await verificarFechas(transporte, startDate, endDate)
        if (validacion === true) return res.status(418).send({ message: 'These dates are already taken' })

        console.log(transpor)

        data.travel = idTravel
        data.transport = idTransport
        data.dateStart = startDate
        data.dateFinal = endDate
        data.price = transpor.price

        //Cobrarle al usuario

        let reservacion = new ReservationTransport(data)
        await reservacion.save()
        return res.send({ message: 'the reservation has been created' })

    } catch (e) {
        console.log(e)
        return res
            .status(500)
            .send({ message: 'Error creating the reservation' })
    }
}


//Obtener todas las reservaciones 
exports.getReservations = async (req, res) => {
    try {
        let reservations = await ReservationTransport.find()
        return res.send({ reservations })
    } catch (e) {
        return res.status(500).send({ message: 'Error getting reservations' })
    }
}


//Obtener unsa sola reservacion
exports.getReservation = async (req, res) => {
    try {
        let reservationId = req.params.id
        let existReservation = await ReservationTransport.findOne({ _id: reservationId })
        if (!existReservation) return res.status(404).send({ message: 'Reservation not found' })
        return res.send({ existReservation })
    } catch (e) {
        return res.status(500).send({ message: 'Error getting reservation' })
    }
}



//Cancelar la reservacion
exports.cancelReservation = async (req, res) => {
    try {
        let idReservation = req.params.id
        let idTravel = req.params.idTravel
        let { sub } = req.user

        //Fecha del dia
        const dateNow = new Date()

        let { dateStart, cordinator } = await Travel.findOne({ _id: idTravel })

        if (cordinator.toString() !== sub) return res.status(403).send({ message: 'No puedes cancelar la reservacion porque no eres el coordinador' })

        dateNow.setHours(0, 0, 0, 0)
        dateStart.setHours(0, 0, 0, 0)

        console.log(Date.parse(dateNow), Date.parse(dateStart))
        if (Date.parse(dateNow) === Date.parse(dateStart)) return res.status(422).send({ message: 'No puedes cancelar la reservacion' })

        let deleteReservation = await ReservationTransport.findOneAndDelete({ _id: idReservation })
        if (!deleteReservation) return res.status(400).send({ message: 'Could not cancel the reservation' })
        return res.send({ message: 'Reservation cancelada' })

    } catch (e) {
        return res.status(500).send({ message: 'Error when canceling the reservation' })
    }
}



//Update Reservation
exports.updateReservation = async (req, res) => {
    try {
        let idReservation = req.params.idReservation
        let idTravel = req.params.idTravel
        let idTransport = req.params.idTransport
        let { sub } = req.user
        let data = req.body


        //Verificar que sea coordinador del viaje
        let { dateStart, dateEnd, cordinator } = await Travel.findOne({ _id: idTravel })
        if (cordinator.toString() !== sub) return res.status(403).send({ message: 'No puedes cancelar la reservacion porque no eres el coordinador' })

        let dateNow = new Date()
        let startDate = dateStart
        let endDate = dateEnd

        dateNow.setHours(0, 0, 0, 0)
        startDate.setHours(0, 0, 0, 0)

        //Verificar que no se intente modificar el dia del viaje
        if (Date.parse(dateNow) === Date.parse(dateStart))
            return res.status(400).send({ message: 'No puedes modificar la reservacion este dia' })

        //Verificar que exista el transporte
        let existTransport = await Transport.findOne({_id: idTransport})
        if(!existTransport) return res.status(404).send({message: 'Transport not found'})


        //Verificar que el transporte este disponible ese dia
        let transpor = await ReservationTransport.find({ transport: idTransport })

        let validacion = await verificarFechas(transpor, startDate, endDate)
        if (validacion === true) return res.status(418).send({ message: 'These dates are already taken' })


        let updateReservation = await ReservationTransport.findOneAndUpdate(
            {_id: idReservation},
            {
                transport: idTransport,
                price: existTransport.price
            },
            {new: true}
        )
        
        if(!updateReservation) return res.status(400).send({message: 'No se pudo modificar la reservacion'})
        return res.send({message: 'Reservacion Modificada'})

    } catch (e) {
        return res.status({ message: 'Error modifying the reservation' })
    }
}