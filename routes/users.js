const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const req = require('express/lib/request');
const res = require('express/lib/response');

const users = require('../controllers/users');
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.renderLogin)
    .post(
        passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/login',
        }),
        users.login
    );

router.get('/logout', users.logout);

module.exports = router;
