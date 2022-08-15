const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const passport = require('passport')

const initializePassport = require('../passport-config')
const users = require('../models/user')

initializePassport(
    passport,
    email => users.findOne({ email: email }),
    id => users.findOne({ id: id })
)

// Users Route
router.get('/', checkAuthenticated, async(req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('index')
})

// User Login
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('users/login')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
}))

// User Register
router.get('/register', checkNotAuthenticated, async (req, res) => {
    res.render('users/register', { message: '' })
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const checkID = await users.find({ id: req.body.id }).exec()
        const checkEmail = await users.find({ email: req.body.email }).exec()
        console.log(checkID.length,checkEmail.length)
        if ((checkID.length == 0) && (checkEmail.length == 0)) {
            const bcryptPassword = await bcrypt.hash(req.body.password, 10)
            const user = new users({
                id: req.body.id,
                name: req.body.name,
                province: req.body.province,
                city: req.body.city,
                email: req.body.email,
                phone: req.body.phone,
                password: bcryptPassword
            })
            const newUser = await user.save()
            res.redirect('/login')
        }
        else if (checkID.length != 0) {
            res.render('users/register', { message: '该用户已存在' })
        }
        else if (checkEmail.length != 0) {
            res.render('users/register', { message: '该邮箱已占用' })
        }
    } catch (err) {
        console.log(err)
    }
})

router.delete('/logout', function (req, res, next) {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

module.exports = router

