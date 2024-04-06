const express = require('express');
const pageController = require('../controllers/pageController');
const courseController = require('../controllers/courseController');

const redirect = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndex);
router.route('/about').get(pageController.getAbout);
router.route('/contact').get(pageController.getContact);
// router.route('/contact').post(pageController.sendEmail);
router.route('/login').get(redirect.redirectLogin,pageController.getLogin);
router.route('/register').get(pageController.getRegister);
// router.route('*').get((req, res) => {
//   res.send('404 NOT FOUND');
// });

module.exports = router;
