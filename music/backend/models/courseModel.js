const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    courseId:String,
    name:String,
    category:String,
    videos: [
        {
          videoId: String,
          title: String,
          url: String,
        },
      ],
      imageUrl: String,
      rating: Number,
      users: Number, 
});
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;