const express = require('express')
const router = express.Router()
const users = require('../models/user')

router.get('/:id', checkAuthenticated, async (req, res) => {
    res.render('users/edit')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

module.exports =router