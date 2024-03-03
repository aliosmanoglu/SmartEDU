const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndex);
router.route('/about').get(pageController.getAbout);
router.route('/contact').get(pageController.getContact);
router.route('/dashboard').get(pageController.getDashboard);
router.route('/login').get(pageController.getLogin);
router.route('/register').get(pageController.getRegister);
router.route('/courses').get(pageController.getCourses);
router.route('/course').get(pageController.getCourse);



module.exports = router;
