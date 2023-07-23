'use strict'

const bcrypt = require('bcrypt');

// funcion para validar que cada parametro venga y si no avisarle que hacen falta datos
exports.validateData = (data)=>{
    let keys = Object.keys(data), msg = '';
    for(let key of keys){
        if( data[key] !== null &&
            data[key] !== undefined &&
            data[key] !== '') continue;
        msg += `Params ${key} is required\n`;
    }
    return msg.trim();
}
  

// funcion para encriptar password
exports.encrypt = async (password) => {
    try {
        return await bcrypt.hash(password, 12);
    } catch (err) {
        console.log(err)
        return err;
    }
}
// validacion de contraseña
exports.checkPassword = async (password,hash) =>{
    try {
        return await bcrypt.compare(password, hash)
    } catch (err) {
        console.log(err)
        return false;
    }
}
 
