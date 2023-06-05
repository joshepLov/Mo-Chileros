"use strict";

const User = require("./user.model");

const {
  validateData,
  encrypt,
  checkPassword,
  prepareDataUser,
} = require("../utils/validate");
const { createToken } = require("../services/jwt");

//usuario por defecto
exports.test = async (req, res) => {
  res.send({ message: "test is running" });
};
//usuarioAdmin

exports.userDefault = async () => {
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
    return res.status(500).send({ message: "error server" });
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
      await user.save();
      return res.send({ message: "account create succesfuly" });
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
      return res.send({ message: `Welcome to Mochileros ${user.name}`, token });
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

    const hasDeniedParams = Object.values(paramsDenied).some((param) => param !== undefined);
    //validacion de usuario existente
    let existsUser = await User.findOne({ _id: paramsId });
    if (!existsUser) return res.status(404).send({ message: "not found user" });
    // comprobacion de acceso a perfil
    console.log(userId.sub, paramsUser);
    if (userId.sub == paramsId) {
      // validacion de parametros denegados
      if(hasDeniedParams) return res
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
            return res.send({message: "succesful update", UpdatingUser})

      
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
}

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
}
