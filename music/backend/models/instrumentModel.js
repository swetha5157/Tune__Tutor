const mongoose=require('mongoose')
const instrumentSchema=new mongoose.Schema({
      id:{
            type: String,
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