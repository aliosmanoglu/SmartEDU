const User = require('../models/User');

exports.redirectLogin = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (req.session.userID) {
    return res.status(200).redirect('/');
  } 
  next();
};

exports.redirectCourse = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (req.session.userID) {
    return res.status(200).redirect('/');
  } else {
    return res.status(400).redirect('/register');
  }
  next();
};