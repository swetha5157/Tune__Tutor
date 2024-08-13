const express = require('express');
const router = express.Router();
const auth=require('../middlewares/auth')
const courseController=require('../controllers/courseController')

router.post('/',auth,courseController.addCourse);
router.get('/',auth,courseController.getCourse);
router.get('/:courseId',auth,courseController.getCourseById)
module.exports=router;