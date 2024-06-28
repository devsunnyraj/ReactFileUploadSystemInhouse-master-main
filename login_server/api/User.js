const express = require("express")
const router = express.Router()

const ImageModel = require("../models/ImageModel")


//imageUpload

router.post("/uploads",(req,res)=>{
    const body = req.body;
    try{
        const newImage = new ImageModel(body)
        newImage.save()
        res.status(201).json({msg: "New image uploaded !"})
    }catch(error){
        res.status(409).json({message : error.message})
    }
})

router.post("/uploads/getimg",(req,res)=>{
    const {fileName} = req.body
    ImageModel.find({fileName}).then(data=>{
        res.json({
            fileName:data[0]
        })
    })
})



module.exports = router