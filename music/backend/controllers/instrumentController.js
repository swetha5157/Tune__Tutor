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
exports.getInstrumentById = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching instrument with ID: ${id}`);
  
  try {
    // Check if ID is in a valid format
    if (!id) {
      console.error('No ID provided');
      return res.status(400).json({ message: 'No ID provided' });
    }

    const instrument = await Instrument.findOne({ id: id });    
    if (!instrument) {
      console.log('Instrument not found');
      return res.status(404).json({ message: 'Instrument not found' });
    }

    console.log('Instrument found:', instrument);
    res.json(instrument);
  } catch (e) {
    console.error('Error fetching instrument:', e);
    res.status(500).json({ message: 'Server error' });
  }
};




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
  const { id } = req.params;
  const { name, category, description, brief_description, rating, pricing, review_count, image_url } = req.body;
  try {
      const updatedInstrument = await Instrument.findOneAndUpdate(
          { id: id },
          { name, category, description, brief_description, rating, pricing, review_count, image_url },
          { new: true }
      );
      if (!updatedInstrument) return res.status(404).json('Instrument not found');
      res.status(200).json('Instrument updated successfully');
  } catch (e) {
      console.log(e);
      res.status(500).json('An error occurred while updating the instrument');
  }
}

exports.deleteInstrument=async(req,res)=>{
  const { id } = req.params;
  try {
      const deletedInstrument = await Instrument.findOneAndDelete({ id: id });
      if (!deletedInstrument) return res.status(404).json('Instrument not found');
      res.status(200).json('Instrument deleted successfully');
  } catch (e) {
      console.log(e);
      res.status(500).json('An error occurred while deleting the instrument');
  }
}