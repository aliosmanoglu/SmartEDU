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
      const search = req.query.search;

      let filter = {name : ''};
      if(search) {
        filter = {name : search};
      }


      const category = await Category.findOne({slug : req.params.slug});
      const categories = await Category.find({});

      const courses = await Course.find({
        $or : [
          {name : {$regex:  '.*' + filter.name + '.*' ,$options: 'i' }},
          {category : category._id}
        ]
      }).sort('-createdAt');

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

