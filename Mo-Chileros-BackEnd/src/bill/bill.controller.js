'use strict'

const Bill = require('./bill.model')
const Travel = require('../travel/travel.model')
const ReservationHotel = require('../reservationHotel/reservationHotel.model')
const ReservationTransport = require('../reservationTransport/reservationTransport.model')
const User = require('../User/user.model')
const user = ['name', 'lastname']
const travel = ['dateStart', 'dateEnd']

//Test
exports.test = async (req, res) => {
    return res.send({ message: 'Conexion' })
}


//Crear factura
exports.createBill = async (req, res) => {
    try {
        let idTravel = req.params.idTravel
        let idReservationTransport = req.params.idReservationTransport
        let { sub } = req.user
        let data = req.body

        //Buscar todos los participantes de un viaje
        let { members } = await Travel.findOne({ _id: idTravel })

        //Buscar el transporte
        let transport = await ReservationTransport.findOne({ travel: idTravel })

        let pricePerson = transport.price / members.length


        //Buscar la reservacion del hotel
        let priceReservation = await ReservationHotel.findOne({ user: sub })

        let precioHotel = priceReservation.price
        let precioTotal = precioHotel + pricePerson

        data.travel = idTravel
        data.user = sub
        data.reservationTranport = transport._id
        data.reservationHotel = priceReservation._id
        data.roomPrice = precioHotel
        data.transportPrice = pricePerson
        data.totalPrice = precioTotal
        data.status = false

        let createBill = new Bill(data)
        await createBill.save()
        return res.send({ message: 'Factura creada', createBill })

    } catch (e) {
        console.log(e)
        return res
            .status(500)
            .send({ message: 'Error creating bill' })
    }
}


//Obtener todas las facturas
exports.gettBills = async (req, res) => {
    try {
        let bill = await Bill.findOne()
            .populate('user', user)
            .populate('travel', travel)
        return res.send({ bill })
    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Errro getting bills' })
    }
}


//Obtener factura de quien esta logeado
exports.getBillLogged = async (req, res) => {
    try {
        let { sub } = req.user

        //Buscar la factura de quien esta loggeado
        let bill = await Bill.findOne({ user: sub })
            .populate('user', user)
            .populate('travel', travel)

        if (!bill) return res.status(404).send({ message: 'Bill not found' })

        return res.send({ bill })

    } catch (e) {
        return res
            .status(500)
            .send({ message: 'Error getting bill' })
    }
}



//Actualizar el estado de la factura
exports.updatedBill = async (req, res) => {
    try {
        let idTravel = req.params.idTravel
        let idReservationTransport = req.params.idReservationTransport

        //Buscar si existe el viaje
        let travel = await Travel.findOne({ _id: idTravel })
        if (!travel) return res.status(404).send({ message: 'Travel not found' })


        //Buscar el precio del transporte
        let transport = await ReservationTransport.findOne({ travel: idTravel })


        //Buscar todas las facturas que esten asociadas con el viaje
        let bills = await Bill.find({ travel: idTravel })


        //Miembros del viaje
        let members = travel.members.length
        let precioPerson = transport.price / members



        //Modificar el precio de la factura

        for (let i = 0; i < travel.members.length; i++) {

            let id = travel.members[i].user.toString()

        
            //Actualizar los cambios
            let update = await Bill.findOneAndUpdate(
                { user: id },
                {
                    
                },
                { new: true }
            )
        
        }

        


    } catch (e) {
        console.log(e)
        return res
            .status(500)
            .send({ message: 'Error updating bill' })
    }
}