'use strict'

const Transport = require('./transport.model')
const fs = require ('fs')
const path = require('path')

exports.addTransport = async(req, res)=> {
    try{
        let data = req.body;
        let existTranport = await Transport.findOne({type: data.type})
        if(existTranport){
            return res.send({message: 'Tranport alredy created'})
        }
        let transport = new Tranposrt(data)
        await transport.save()
        return res.send({message:'Tranposrt ' })
    }catch(err){
    console.error(err)
    return res.status(500).send({message: 'Error creating transport'})
}

}

exports.getTranports = async(req, res)=>{
    try{
        let transports = await Transport.find()
        return res.send({message: 'Transports Found', transports})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting Tranports '})
    }
}

exports.getTransport = async(req, res)=>{
    try {
        let transportId = req.params.id
        let transport = await Tranposrt.findOne({_id: transportId})
        if(!transport) return res.status(500).send({message: 'Error getting Transport '})
    } catch (err) {
        console.error(err)
        return res.send(500).send({message: 'Error getting Transport'})
    }
}

exports.deleteTransport = async(req, res)=>{
    try {
        let transportId = req.params.id
        let deteleTransport = await Transport.findOneAndDelete({_id: transportId})
        if(!deleteTransport) return res.status(404).send({message: 'Transport deleted successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting Transport'})
    }
}


exports.updateTransport = async (req, res)=>{
    try{
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating Transport'})
    }
}











exports.addImage = async(req, res)=>{
    try{
        const roomId = req.params.id; 
        const alreadyImage = await Transport.findOne({_id: roomId})
        let pathFile = './uploads/bedrooms/'
        if(alreadyImage.image) fs.unlinkSync(`${pathFile}${alreadyImage.image}`) 
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
            const updatedRoomImage = await Transport.findOneAndUpdate(
                {_id: roomId}, 
                {image: fileName}, 
                {new: true}
            )
            if(!updatedRoomImage) return res.status(404).send({message: 'Room not found and not updated'});
            return res.send({message: 'User updated', updatedRoomImage})
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
        const pathFile = `./uploads/bedrooms/${fileName}`

        const image = fs.existsSync(pathFile);
        if(!image) return res.status(404).send({message: 'image not found'})
        return res.sendFile(path.resolve(pathFile))
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting image'});
    }
}