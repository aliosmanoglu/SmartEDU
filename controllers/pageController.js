exports.getIndex = (req, res) => {
    res.status(200).render('index', {
      pageName: 'index',
    });
  }
exports.getAbout = (req, res) => {
    res.status(200).render('about', {
      pageName: 'about',
    });
  }
exports.getContact = (req, res) => {
    res.status(200).render('contact', {
      pageName: 'contact',
    });
}
exports.getDashboard = (req, res) => {
    res.status(200).render('dashboard', {
      pageName: 'dashboard',
    });
}