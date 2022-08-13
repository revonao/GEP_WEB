const express = require('express')
const router = express.Router()
const users = require('../models/user')

router.get('/', checkAuthenticated, async (req, res) => {
    res.redirect('/')
})

router.get('/:id', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('users/edit')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

module.exports =router