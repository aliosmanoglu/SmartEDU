const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      user: req.session.userID,
    });

    const user = await User.findById(req.session.userID);
    await user.courses.push(course);
    await user.save();

    req.flash('success','Course is created');
    const string = '/courses/' + course.slug;
    res.status(201).redirect(string);

  } catch (error) {
    req.flash('error',error.message );
    res.status(400).redirect('/users/dashboard');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const search = req.query.search;

    let filter = {name : ''};
    if(search) {
      filter = {name : search};
    }


    const courses = await Course.find({
      $or : [
        {name : {$regex:  '.*' + filter.name + '.*' ,$options: 'i' }}
      ]
    }).sort('-createdAt').populate('user');
    const categories = await Category.find();


    res.status(200).render('courses', {
      pageName: 'courses',
      courses,
      categories,
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
    const course = await Course.findOne({ slug: req.params.slug });
    const user = await User.findById(course.user);
    const categories = await Category.find({});

    const sessUser = await User.findById(req.session.userID);
   

    res.status(200).render('course', {
      pageName: 'course',
      course,
      user,
      sessUser,
      categories
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.takeCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.body.course_id);
    const user = await User.findById(req.session.userID);

    await user.courses.push(course);
    await user.save();

    console.log("user course : ", user.courses);

    res.status(200).redirect('/courses/' + course.slug);

  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.releaseCourse = async (req,res) => {
  try {
    const course = await Course.findById(req.body.course_id);
    const user = await User.findById(req.session.userID);

    await user.courses.pull(course);
    await user.save();


    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
}

exports.deleteCourse = async (req,res) => {

  try {
    await Course.findOneAndDelete({slug : req.params.slug});

    req.flash('success','Course is deleted');
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
}
exports.updateCourse = async (req,res) => {

  try {
    let course = await Course.findOne({slug : req.params.slug});
    course.name = req.body.name;
    course.desc = req.body.desc;
    course.category = req.body.category;
    await course.save();

    req.flash('success','Course is updated');
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
}