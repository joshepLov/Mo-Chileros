"use strict";

const User = require("./user.model");
const fs = require('fs')
const path = require('path')

const {
  validateData,
  encrypt,
  checkPassword,
} = require("../utils/validate");

const { createToken } = require("../services/jwt");

// constante para restringer parametros para mochileros
const restrictedInfo = "-password -role -email -dpi -phone -email -_id";

//usuario por defecto
exports.test = async (req, res) => {
  res.send({ message: "test is running" });
};


//usuarioAdmin
exports.userDefault = async (req,res) => {
  try {
    let data = {
      name: "admin",
      lastname: "418",
      username: "ADMIN",
      password: "admin",
      email: "email",
      phone: "12345678",
      role: "ADMIN",
      image: "",
      dpi: "000000001",
      age: "18",
    };
    data.password = await encrypt(data.password);
    let existDefault = await User.findOne({ name: data.name });
    let adminDefault;
    if (!existDefault) {
      adminDefault = new User(data);
      await adminDefault.save();
      console.log(`${data.username} created`);
    } else {
      console.log(`admin already created`);
    }
  } catch (err) {
    console.error(err);
    // return res.status(500).send({ message: "error server" });
  }
};

// funcion para que se registre el mochilero(cliente)
exports.register = async (req, res) => {
  try {

    //obtener data
    let data = req.body;
    console.log();
    let params = {
      name: data.name,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      email: data.email,
      dpi: data.dpi,
      phone: data.phone,
      age: data.age,
    };

    //validar parametros obligatorios
    let validate = validateData(params);
    if (validate) return res.status(409).send(validate);

    //validar si no hay usuario con estas credenciales
    let dataValidate = await User.findOne({
      $or: [
        { username: data.username },
        { dpi: data.dpi },
        { email: data.email },
      ],
    });

    //si no hay un usuario con las mismas credenciales, se crea el usuario
    if (!dataValidate) {
      data.password = await encrypt(data.password);
      data.role = "MOCHILERO";
      let user = new User(data);
      const token = await createToken(user)
      await user.save();
       let id = user._id
      return res.send({ message: "account create succesfuly", id, token });
    }
    return res
      .status(409)
      .send({ message: "Your data already exist in our app, please sign in" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .send({ message: "Error creating your account", error: err.message });
  }
};
// log in
exports.login = async (req, res) => {
  try {

    //data
    let data = req.body;
    let credentials = {
      username: data.username,
      password: data.password,
    };

    // validar que vengan los datos
    let validateCredentials = validateData(credentials);
    if (validateCredentials)
      return res.status(401).send({ validateCredentials });
    let user = await User.findOne({ username: data.username });

    //validacion si existe usuario y si las credenciales son validas
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    } else if (user && (await checkPassword(data.password, user.password))) {
      let token = await createToken(user);
      const logged = {
        name: `${user.name} ${user.lastname}`,
        role: user.role, photo : user.photo, id: user._id
      };
      return res.send({ message: `Welcome to Mochileros ${user.name}`, token, logged});
    } else {
      return res.status(401).send({ message: "please check your credentials" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message:
        "error accessing your session, please check your credentials or try later",
    });
  }
};

// update user
exports.UpdateUser = async (req, res) => {
  try {

    //data
    let userId = req.user;
    let paramsId = req.params.id;
    let paramsUser = req.params.username;
    let data = req.body;

    //parametros no permitidos
    let paramsDenied = {
      email: data?.email,
      password: data?.password,
      role: data?.role,
      rank: data?.rank,
      history: data?.history,
    };

    const hasDeniedParams = Object.values(paramsDenied).some(
      (param) => param !== undefined
    );

    //validacion de usuario existente
    let existsUser = await User.findOne({ _id: paramsId });
    if (!existsUser) return res.status(404).send({ message: "not found user" });

    // comprobacion de acceso a perfil
    if (userId.sub == paramsId) {

      // validacion de parametros denegados
      if (hasDeniedParams)
        return res
          .status(422)
          .send({ message: "Have submitted some data that cannot be updated" });

      let UpdatingUser = await User.findOneAndUpdate(
        { _id: userId.sub },
        data,
        { new: true, projection: { _id: 0, password: 0, role: 0 } }
      );

      if (!UpdatingUser)
        return res
          .status(400)
          .send({ message: "error updating a user, please check your data" });
      return res.send({ message: "succesful update", UpdatingUser });

      //actualizacion de usuario
    } else {
      return res.status(403).send({ message: `you don't have access` });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .send({ message: "error updating your account, please try later" });
  }
};

exports.registerAdmin = async (req, res) => {
  try {

    //obtener data
    let data = req.body;
    let dataAdmin = req.user;
    let params = {
      name: data.name,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      email: data.email,
      dpi: data.dpi,
      phone: data.phone,
      age: data.age,
    };
    let validate = validateData(params);
    if (validate) return res.status(409).send(validate);

    const createUser = async (data) => {
      try {
        let dataValidate = await User.findOne({
          $or: [
            { username: data.username },
            { dpi: data.dpi },
            { email: data.email },
          ],
        });

        // Si no hay un usuario con las mismas credenciales, se crea el usuario
        if (!dataValidate) {
          data.password = await encrypt(data.password);
          let user = new User(data);
          console.log(user);
          await user.save();
          return user;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    };

    //validar si no hay usuario con estas credenciales

    switch (data.role) {
      case "MODERADOR":
        let userRegisted = await createUser(data);
        if (userRegisted == false) {
          console.log(userRegisted);
          return res.status(401).send({
            message: "Some data is already in our system, check the data",
          });
        }

        return res.send({ message: "user created succesfuly", userRegisted });

      default:
        return res
          .status(422)
          .send({ message: "you can not submit this data" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .send({ message: "Error creating your account", error: err.message });
  }
};

// Funcion para traer Usuarios
exports.getUsers = async (req, res) => {
  try {

    //datos usuario
    let userId = req.user;

    //funcion para Encontrar usuarios segun una instruccion
    let functionGetUsers = async (prompt) => {
      let users = await User.find({}).select(prompt);
      return res.send({ message: "USERS", users });
    };

    // validacion, que informacion se puede mostrar al usuario
    if (userId.role === "ADMIN") {
      functionGetUsers("-password");
    } else {
      functionGetUsers(restrictedInfo);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Error getting user" });
  }
};

exports.getUser = async (req, res) => {
  try {

    //data
    let data = req.params.id
    let userId = req.user;

    //funcion para mostrar el usuario segun una instruccion
    let fuctionShowUser = async(prompt)=>{
      let userData = await User.findOne({_id:data}).select(prompt)
      if(!userData)     return res.status(404).send({ message: `User didn't found` });
      return res.send({userData})
    }

    // validacion para mostrar informacion segun el usuario
    if(userId.role == "ADMIN"){
      fuctionShowUser('-password')
    }else{
      fuctionShowUser(restrictedInfo)
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "error getting your user" });
  }
};


exports.addImage = async(req, res)=>{
  try{
      const userId = req.params.id;
      const alreadyImage = await User.findOne({_id: userId})

      console.log(alreadyImage);
      let pathFile = './uploads/User/'

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
          const updateUserImage = await User.findOneAndUpdate(
              {_id: userId},
              {image: fileName},
              {new: true}
          )
          if(!updateUserImage) return res.status(404).send({message: 'user not found and not updated'});
          return res.send({message: 'User updated', updateUserImage})
      }
      fs.unlinkSync(filePath)
      return res.status(404).send({message: 'File extension cannot admited'});


  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error adding image', err})
  }
}

exports.getImage = async(req, res)=>{
  try{
      const fileName = req.params.fileName;
      const pathFile = `./uploads/User/${fileName}`

      const image = fs.existsSync(pathFile);
      if(!image) return res.status(404).send({message: 'image not found'})
      return res.sendFile(path.resolve(pathFile))
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error getting image'});
  }
}
