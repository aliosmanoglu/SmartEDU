const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};
exports.getAllCategories = async (req, res) => {
    try {
      const category = await Category.findOne({slug : req.params.slug});
      const categories = await Category.find({});

      const courses = await Course.find({category : category._id});

      console.log(category);
      
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
      console.log(error);
    }
  };

