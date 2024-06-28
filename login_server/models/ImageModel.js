const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    fileName : String,
    myFile: String
})

const ImageModel= mongoose.model("imagePost",imageSchema)

module.exports = ImageModel
