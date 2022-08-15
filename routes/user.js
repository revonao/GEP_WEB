const express = require('express')
const bcrypt = require('bcrypt')
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
    user = await users.findOne({ id: req.params.id })
    res.render('users/edit', { user: user })
})

router.put('/:id', checkAuthenticated, async (req, res) => {
    let user
    const bcryptPassword = await bcrypt.hash(req.body.password, 10)
    try {
        user = await users.findOne({ id: req.params.id })
        user.name = req.body.name
        user.province = req.body.province
        user.city = req.body.city
        user.phone = req.body.phone
        user.password = bcryptPassword
        await user.save()
        res.redirect(`/user/${user.id}`)
    } catch {
        if (user != null) {

        } else {
            res.redirect('/')
        }
    }
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

module.exports =router