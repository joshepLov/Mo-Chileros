'use strict '

const Route = require('../routesTravel/route.model')
const Travel = require('./travel.model')

const restrictedInfo = ' -statusTravel -members -Activities -reservations'

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
      }else if( data.status == false|| data.status == 'false'){
        data.cordinator = dataUser.sub
      }
      
      // datos obligatorios en travel 
      data.place = findRoute.place;
      data.capacity = findRoute.capacityMembers; 
      data.route = findRoute._id;
      
       

      //creacion del viaje
      let travel = new Travel(data);
      travel.members = [{user: dataUser.sub}]
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
    let travels = await Travel.find({status:true}).select(restrictedInfo);
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
    let dataUser = req.user

    //buscar si el mochilero esta en el viaje
    let findMochilero = await Travel.findOne({_id: data, status:true, 'members.users': dataUser.sub})
    //buscar datos
    let travel = await Travel.findOne({ _id: data, status: true }).select(restrictedInfo);

    //validar datos
    if(!findMochilero){
      if (!travel)
        return res.status(403).send({ message: "travel doesnt found" });
    return res.send({ travel  });
    }else{
    return res.send({ findMochilero  });
    }
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


//update travel 

exports.UpdateTravel = async(req, res) =>{
  try {
    //data
    let travelId = req.params.id;
    let dataUser = req.user
    let data = req.body;
    const startDate = new Date(data.dateStart)
    
    // encontrar vieaje existente
    let existsTravel = await Travel.findOne({ _id: travelId });

    //encontrar si los cambios son del cordinador
    let existsCordinator = await Travel.findOne({_id: travelId, cordinator: dataUser.sub})

    //setear parametros
    let obtainDate = existsTravel.dateStart
    let limitDate = obtainDate.setDate(obtainDate.getDate()-14)

    //parametros no permitidos
    let paramsDenied = {
      travelStatus: data?.travelStatus,
      price: data?.price, 
      hotel: data?.hotel,
      transport : data?.transport, 
      cordinator: data?.cordinator
    };
    
    const hasDeniedParams = Object.values(paramsDenied).some(
      (param) => param !== undefined
      );

    // verificar viaje existente
    if (!existsTravel)
      return res.status(404).send({ message: "travel doesnt found" });
  
    // verifivar cordinador 
    if(!existsCordinator)
      return res.status(404).send({ message: "you dont have acces to do this" });

    // denegar parametros
    if (hasDeniedParams)
      return res
        .status(422)
        .send({ message: "Have submitted some data that cannot be updated" });

    // verificar si la fecha es dos semanas antes del viaje  
    if(startDate <= limitDate || existsTravel.dateStart < limitDate )
      return res.status(422).send({message: 'you cannot updated a travel 2 weeks before the travel'})
  
    // si viene lugar 
    if(data.place.length != 0){
      console.log(existsTravel.members.length );
      // si la lista de miembros es de 2 no puede cambiar el lugar
      if(existsTravel.members.length == 2) 
      return res.status(403).send({message:'you cannot change the place'}) 
    }
    
    //actualizar
    let UpdateTravel = await Travel.findOneAndUpdate(
      { _id: travelId },
      data,
      { new: true });
    
    //verificar actualizacion
    if (!UpdateTravel)
      return res.status(422).send({ message: "travel doesnt updated" });
    
   //mostrar actualizacoin 
    return res.send({ message: "travel updated", UpdateTravel });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error updating travel" });
  }
};