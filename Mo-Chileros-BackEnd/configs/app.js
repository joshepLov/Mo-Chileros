'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors'); 

const app = express();

const port = process.env.PORT

const userRoutes = require('../src/User/user.routes')
const hotelRoutes = require('../src/hotel/hotel.routes')
const transportRoutes = require('../src/transport/transport.routes')
const routeRoutes = require('../src/routesTravel/routes.routes')
const travelRoutes = require('../src/travel/travel.routes')
const reservationHotelRoutes = require('../src/reservationHotel/reservationHotel.routes')
const reservationTransportRoutes = require('../src/reservationTransport/reservationTrasnport.routes')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev')); 

app.use('/user', userRoutes)
app.use('/hotel', hotelRoutes)
app.use('/transport', transportRoutes)
app.use('/route', routeRoutes)
app.use('/travel', travelRoutes)
app.use('/reservationHotel', reservationHotelRoutes)
app.use('/reservationTrasnport',reservationTransportRoutes )

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`)
}