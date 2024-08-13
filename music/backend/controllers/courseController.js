const express=require("express");
const Course=require('../models/courseModel');
const Order = require('../models/orderModel');
const Instrument = require('../models/instrumentModel');


exports.getCourse=async(req,res)=>{
    const {user_id}=req.user;
    
    try{
        // 1. Fetch the user's orders
    const orders = await Order.find({ user_id: user_id});

    // 2. Extract product IDs from orders
    const productIds = orders.flatMap(order => order.products.map(p => p.product_id));

    // 3. Fetch instruments by product IDs and extract categories
    const instruments = await Instrument.find({ id: { $in: productIds } });
    const purchasedCategories = [...new Set(instruments.map(instrument => instrument.category))];

    // 4. Fetch courses based on categories
    const courses = await Course.find({ category: { $in: purchasedCategories } });
  
    res.json(courses);

       
    }catch(e){
        res.status(500).json({ error: e.message });
    }
}

exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
      const course = await Course.findOne({ courseId });
      if (!course) {
          return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.addCourse=async(req,res)=>{
    const user_id=req.user;
    try {
        const { courseId, name, category, videos, imageUrl, rating, users } = req.body;
    
        const newCourse = new Course({
          courseId,
          name,
          category,
          videos,
          imageUrl,
          rating,
          users
        });
    
        await newCourse.save();
        res.status(201).json({ message: 'Course added successfully', course: newCourse });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
