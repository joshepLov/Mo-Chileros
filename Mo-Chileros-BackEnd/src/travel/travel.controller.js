'use strict '

const Route = require('../routesTravel/route.model')
const Travel = require('./travel.model')

const {validateData,
     encrypt, checkPasssword} = require ('../utils/validate')

exports.test = async (req, res) =>{
    res.send({message: 'test is running'})
}

// creacion del TRAVEL
exports.createTravel = async (req, res) => {
    try {
      //data
      let routeId = req.params.routeId;
      let dataUser = req.user;
      let data = req.body
      const dateNow = new Date()
      const startDate = new Date(data.dateStart)
      const endDate = new Date(data.dateEnd)

      //datos obligatorios
      let params = {
        dateStart: data.dateStart,
        dateEnd: data.dateEnd
      };

      //parametros no permitidos
      let paramsDenied = {
        travelStatus: data?.travelStatus,
        price: data?.price, 
        hotel: data?.hotel,
        transport : data?.transport, 
        cordinator: data?.cordinator
      };
      
      //validacion de parametros no permitidos
      const hasDeniedParams = Object.values(paramsDenied).some(
        (param) => param !== undefined
      );
      if (hasDeniedParams)
      return res
        .status(422)
        .send({ message: "Have submitted some data that cannot be updated" });

      
      //validar datos de ruta
      let findRoute = await Route.findOne({_id:routeId})
      if(!findRoute) return res.status(418).send({message: 'Ooops something happen try later'})
      
      // validacion de parametros obligatorios
      let validateParams = validateData(params);
      if (validateParams) return res.status(403).send(validateParams);
        
      //validacion de fechas seleccionadas 
      if(startDate < dateNow|| endDate < dateNow) return res.status(403).send(
        {message: 'you cannot select a date in the past'})
      
      if(endDate < startDate) return res.status(403).send({message: 'please check your dates'})
     
      // verificar si existe un viaje 
      let findTravel = await Travel.find({
        $and: [{ status: true }, {dateStart: data.dateStart}],
      });
      console.log(data);

      //verificar si status tiene algun valor
      if(data.status == null || data.status == ''){
            data.status = true
      }
      
      // datos obligatorios en travel 
      data.place = findRoute.place;
      data.capacity = findRoute.capacityMembers; 
      data.route = findRoute._id;
      

      //creacion del viaje
      let travel = new Travel(data);
      await travel.save();
      console.log(travel);
      if(findTravel.length == 0){
          return res.send({ message: "travel created succesfuly", travel });
      }else{
        return res.send({ message: "travel created succesfuly", travel, findTravel });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Error trying save travel, try later" });
    }
  };

  // readTravel 

  // obtener travel
exports.getTravelsMochileros = async (req, res) => {
  try {
    //encontrar travel
    let travels = await Travel.find({status:true}).select('-_id -statusTravel');
      if (!travels) return res.status(404).send({ message: "travels dont found, create One!" });
   
      // verificar si travel viene vacio
      if (travels.length == 0)  return res.status(404).send({ message: "travels dont found" });
    return res.send({ message: travels });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error getting travels" });
  }
};

//obtener travel para mochileros
exports.getTravelMochileros = async (req, res) => {
  try {
    //data
    let data = req.params.id;

    //buscar datos
    let travel = await Travel.findOne({ _id: data, status: true }).select("-_id ");

    //validar datos
      if (!travel)
        return res.status(403).send({ message: "travel doesnt found" });
    return res.send({ travel  });
  } catch (err) {
    console.log(err);
  }
};

// obtener travel para moderadores
exports.getTravelsModerator = async (req, res) => {
  try {
    //encontrar travels
    let travels = await Travel.find({});
      if (!travels) return res.status(404).send({ message: "travels dont found" });
    return res.send({ travels });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error getting travels" });
  }
};

//obtener travel para mochileros
exports.getTravelModerator = async (req, res) => {
  try {
    //data
    let data = req.params.id;
    //buscar datos
    let travel = await Travel.findOne({ _id: data});

    //validar datos
      if (!travel)
        return res.status(403).send({ message: "travel doesnt found" });
    return res.send({ travel });
  } catch (err) {
    console.log(err);
  }
};
