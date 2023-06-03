'use strict'

const User = require('./user.model');


const {validateData, encrypt, checkPassword} = require('../utils/validate');

//usuario por defecto 
exports.test = async(req, res)=>{
     res.send({message: 'test is running'})
}

exports.userDefault = async()=>{
    try {
        let data = {
            name: 'admin', 
            lastname:'418', 
            username: 'ADMIN', 
            password: 'admin', 
            email: 'email',
            phone: '12345678',
            role: 'ADMIN', 
            image: '', 
            dpi: '000000001',
            age: '18'
           }
        data. password = await encrypt(data.password);
        let existDefault = await User.findOne({name: data.name});
        let adminDefault ; 
        if(!existDefault){
            adminDefault = new User(data)
            await adminDefault.save()
            console.log(`${data.username} created`)
        }else{
            console.log(`admin already created`);
        }
    
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'error server'})
    }
}

