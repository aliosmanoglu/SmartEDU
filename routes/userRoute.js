const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const { body } = require('express-validator');
const User = require('../models/User');


const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').not().isEmpty().withMessage('Please enter a valid email !')
        .custom(async (userEmail) => {
            await User.findOne({email : userEmail}).then(user => {
                if(user) {
                    return Promise.reject('Emila is alreadt exists !')
                }
            });
        }),
        body('password').not().isEmpty().withMessage('Please Enter Password'),
    ],
    authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware,authController.getDashboard);



module.exports = router;
