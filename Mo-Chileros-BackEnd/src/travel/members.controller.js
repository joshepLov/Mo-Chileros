'use strict'

const User = require('../User/user.model')
const TravelMembers = require('./travel.model')

const {validateData,
     encrypt, checkPasssword} = require ('../utils/validate')
const travelModel = require('./travel.model')

exports.test = async (req, res) =>{
    res.send({message: 'test is running'})
}

//add member 
exports.addMembers = async (req, res) => {
    try {
      //data
      let idTravel = req.params.id;
      let userId = req.params.userId;
      
      // viajes actuales 
      let currentTravels = await TravelMembers.find({status:true})
      // verificar si existen parametros
      let travelsExits = await TravelMembers.findOne({_id: idTravel})
      let members = travelsExits.members;
      let userExists = await User.findOne({_id: userId})
      let memberExists = await travelModel.findOne({ _id: idTravel,"members.user":userId });
      
      //si el viaje existe
      if (!travelsExits)
        return res
          .status(404)
          .send({ message: `travel didn't find or some data already exists` });
      //si el usuario existe
      if (!userExists){    
        return res
          .status(404)
          .send({ message: `user doesnt exists` }); 
      } 
      //si el miembto esta en la lista
      if (memberExists)
        return res.status(409).send({ message: `you already exists in the list` });

        
      //verificar miembros 
      console.log(members.length, travelsExits.capacity);
       if(travelsExits.capacity == members.length){
        return res.status(422).send({message: 'you cannot entry in this travel', currentTravels })
      }

      //añadir miembro
      let addMembers = await TravelMembers.findOneAndUpdate(
        { _id: idTravel },
        {
         $push: {
            members: {user: userId, nameUser: userExists.name}
        }
        },
        { new: true }
      );
      // verificar actualizacion 
      if (!addMembers) return res.status(404).send({ message: "error adding member" });
      return res.send({ message: "member added", addMembers });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "error adding member" });
    }
  };

  //read members 

exports.getMembers = async (req, res) =>{
  try {
    //data
    let travelId = req.params.id
    let user = req.user

    //encontrar viaje con el mismo id del usuario 
    let travel = await TravelMembers.findOne({
     _id: travelId,'members.user': user.sub 
    },{members:1})

    //si viaje no se encuentra o no esta el usuairo en el viaje
    if (!travel)
    return res.status(403).send({ message: "members dont found" });
   
    return res.send({message: travel})
  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'error searching members'})
  }
}

// eliminar member 
exports.deleteMember = async(req, res) =>{
  try {

  //data
    let id = req.params.id
    let userDelete = req.params.userId
    let user = req.user
    
  //member existente y si tiene permisos 
  let existsTravel = await TravelMembers.findOne({_id: id})
  if(!existsTravel)  return res.status(404).send({message: 'travel doesnt found'})
  let existsMember = await TravelMembers.findOne({
    'members.user':userDelete})
  if(!existsMember) return res.status(404).send({message: 'member doesnt found'})

  //eliminar member
  let deleteMember = await TravelMembers.findOneAndUpdate(
    {  _id:id, cordinator: user.sub},
    {
      $pull: {
        members: {user: userDelete}
      },
    },
    { new: true }
  );

  //mostrar
  return res.send({message: deleteMember})

  } catch (err) {
    console.log(err)
    return res.status(500).send({message: 'problem deleting member'})
  }
}
