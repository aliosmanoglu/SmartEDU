const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    const categories = await Category.find();

    res.status(200).render('courses', {
      pageName: 'courses',
      courses,
      categories
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug : req.params.slug});

    console.log(course);

    res.status(200).render('course', {
      pageName: 'course',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};
