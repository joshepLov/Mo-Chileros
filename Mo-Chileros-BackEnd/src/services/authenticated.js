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