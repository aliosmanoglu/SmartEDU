const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require("../middlewares/roleMiddleware");
const redirectMiddleware = require("../middlewares/redirectMiddleware");


const router = express.Router();

router.route('/').post(roleMiddleware(["Teacher","Admin"]),courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/takeCourse').post(courseController.takeCourse);
router.route('/releaseCourse').post(courseController.releaseCourse);



module.exports = router;
