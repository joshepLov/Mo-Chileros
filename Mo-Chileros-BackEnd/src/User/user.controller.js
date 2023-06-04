'use strict'

const User = require('./user.model');


const {validateData, encrypt, checkPassword, prepareDataUser} = require('../utils/validate');

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

// funcion para que se registre el mochilero(cliente)
exports.register = async (req, res)=>{
    try {   
        let data = req.body
        console.log();
        let params  ={
            name:data.name,
            lastname:  data.lastname,
            username:  data.username,
            password: data.password,
            email:  data.email,
            dpi: data.dpi,
            phone:  data.phone,
            age: data.age
        }        
        let validate = validateData(params)
        if(validate) return res.status(409).send(validate)
        let dataValidate = await User.findOne(
            {
                $or:[{username:data.username}, {dpi:data.dpi}, {email: data.email}]
            })
            console.log(dataValidate)
        if(!dataValidate){
            data.password = await encrypt(data.password)
            data.role = "MOCHILERO"
            let user = new User(data);
            await user.save();
            return res.send({message: 'account create succesfuly'})
        } return res.status(409).send({message: "Your data already exist in our app, please sign in"});
    } catch (err) {
        console.error(err);
        return res.status(400).send({message: "Error creating your account", error: err.message})
        
    }
}