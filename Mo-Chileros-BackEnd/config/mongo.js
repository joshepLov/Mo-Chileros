'use strcit'

const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

exports.connect = async()=>{
    try{
        const uriMongo = `${process.env.URI_MONGO}`;
        mogoose.set('strictQuery', false);
        await mongoose.connect(uriMongo);
        console.log('Connected to DB');
    }catch(e){
        console.error(e);
    }
}