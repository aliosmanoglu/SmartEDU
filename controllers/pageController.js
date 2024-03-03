exports.getIndex = (req, res) => {
  res.status(200).render('index', {
    pageName: 'index',
  });
};
exports.getAbout = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about',
  });
};
exports.getContact = (req, res) => {
  res.status(200).render('contact', {
    pageName: 'contact',
  });
};
exports.getDashboard = (req, res) => {
  res.status(200).render('dashboard', {
    pageName: 'dashboard',
  });
};
exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    pageName: 'login',
  });
};
exports.getRegister = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register',
  });
};
exports.getCourses = (req, res) => {
  res.status(200).render('courses', {
    pageName: 'courses',
  });
};
exports.getCourse = (req, res) => {
  res.status(200).render('course-single', {
    pageName: 'course',
  });
};
