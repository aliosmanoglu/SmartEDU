const User = require('../models/User');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Course = require('../models/Course');

const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    let str = "";
    for (let i = 0; i < errors.array().length; i++) {
      str += `${errors.array()[i].msg} -- \n`;
    }
    console.log(str);
    req.flash('error', str);
    res.status(400).redirect('/register');

    
    // console.log(errors.array());
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        try {
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          } else {
            throw new Error('Password is wrong.');
          }
        } catch (error) {
          req.flash('error', error.message);
          res.status(400).redirect('/login');
        }
      });
    } else {
      throw new Error('This user is not exists !!');
    }
  } catch (error) {
    req.flash('error', error.message);
    res.status(400).redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).redirect('/');
  });
};

exports.getDashboard = async (req, res) => {
  const user = await User.findById(req.session.userID).populate('courses');
  const categories = await Category.find({});

  res.status(200).render('dashboard', {
    pageName: 'dashboard',
    user,
    categories,
  });
};
