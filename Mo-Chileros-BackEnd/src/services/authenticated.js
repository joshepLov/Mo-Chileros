'use strict'
// validacion de token 

const jwt = require('jsonwebtoken')

//funcion middleware

exports.ensureAuth=(req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).send({message: `does'nt contain header "AUTHORIZATION"`});
    }else{
        try {
            let token = req.headers.authorization.replace(/['"]+/g, '');
            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`)    

            if(Math.floor(Date.now()/1000)>= payload.ex){
                return res.status(401).send({message: 'Expired token'});
            }

        } catch (err) {
            console.error(err);
            return res.status(400).send({message: 'invalid token'});
        }
        req.user = payload;
        next()
    }
}

exports.isAdmin = async (req, res, next)=>{
    try {
        let user = req.user;
        console.log(user.role)
        if(user.role !== 'ADMIN')return res.status(403).send({message: 'unauthorized user'});
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).send({message:'error unauthorized user'})
    }
}

exports.isMochilero = async (req, res, next)=>{
    try {
        let user = req.user;
        console.log(user.role)
        if(user.role !== 'MOCHILERO')return res.status(403).send({message: 'unauthorized user'});
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).send({message:'error unauthorized user'})
    }
}

//validar moderador o admin, permiso para realizar distintas acciones
exports.isModerator = async(req,res ,next)=>{
    try {
        let user = req.user;
        console.log(user.role);
        if(user.role !== 'ADMIN'&& user.role !=='MODERADOR')return res.status(403).send({message: 'unauthorized user'});
        next();
    } catch (err) {
        console.log(err)
        return res.status(403).send({message: 'error unauthorized user'})
    }
}