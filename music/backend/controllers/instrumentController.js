const Instrument=require("../models/instrumentModel")
const {v4:uuidv4}=require('uuid')
exports.getInstruments=async(req,res)=>{
    try{
        const instruments=await Instrument.find()
        res.send(instruments);
    }catch(e){
        console.log(e);
    }
}

exports.createInstrument=async(req,res)=>{
    console.log(req.body)
  const {name,category,description,brief_description,rating,pricing,review_count,image_url}= req.body;
try{
  const newInstrument=new Instrument({
    id:uuidv4(),
    name,
    category,
    description,
    brief_description,
    rating,
    pricing,
    review_count,
    image_url
  })

await newInstrument.save();
res.status(200).json("Instrument added successfully")
}catch(e){
    console.log(e)
}
}

exports.updateInstrument=async(req,res)=>{
    const{id}=req.params;
    const { name, category, description, brief_description, rating, pricing, review_count, image_url } = req.body;
    try{
      const updatedInstrument=await Instrument.findOneAndUpdate(
        { id: id },
        { name, category, description, brief_description, rating, pricing, review_count, image_url },
        {new:true}
      );
      if(!updatedInstrument) return res.status(404).json('Instrument not found');
      res.status(500).json('Instrument updated successfully');
    }catch(e){
      console.log(e);
    }
}

exports.deleteInstrument=async(req,res)=>{
   const {id}=req.params;
   try{
    const deletedInstrument=await Instrument.findOneAndDelete({id:id});
    if(!deletedInstrument) return res.status(404).json('Instrument not found');
    res.status(500).json('Instrument deleted');
   }catch(e){
    console.log(e);
   }
}