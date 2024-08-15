const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid'); 
const instrumentSchema=new mongoose.Schema({
      id:{
            type: String,
            default: uuidv4,
            required: true,
            unique: true,
      },
      name:String,
      category:String,
      description:String,
      brief_description:String,
      rating:Number,
      pricing:Number,
      review_count:Number,
      image_url:String
})

const Instrument=new mongoose.model('Instrument',instrumentSchema)
module.exports=Instrument;