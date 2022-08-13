const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const calcs = require('../models/calcs')
const uploadPath = 'geo_modules/geodata/fileUpload/tif'

const upload = multer({ dest: uploadPath })


const PythonShell = require('python-shell').PythonShell


router.get('/', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.redirect('add/waterConservation')
})

router.post('/', checkNotAuthenticated, async (req, res) => {

})

router.get('/waterConservation', checkAuthenticated, async (req, res) => {
    res.render('calcs/waterConservation')
})

router.post('/waterConservation', checkAuthenticated, upload.fields([{name: 'f1', maxCount: 1}, {name: 'f2', maxCount: 1}]), async (req, res) => {
    console.log(req.files['f1'][0].path)
    let options = {
        args: [req.files.f2.path, req.body.f2]
    }
    PythonShell.run('./geo_modules/test.py', null, function (err) {
        if (err) throw err
        console.log('finished')
        res.redirect('/')
      })
})

router.get('/soilConservation', checkAuthenticated, async (req, res) => {
    res.render('calcs/soilConservation')
})

router.get('/windbreakAndSandFixation', checkAuthenticated, async (req, res) => {
    res.render('calcs/windbreakAndSandFixation')
})

router.get('/floodControl', checkAuthenticated, async (req, res) => {
    res.render('calcs/floodControl')
})

router.get('/carbonFixation', checkAuthenticated, async (req, res) => {
    res.render('calcs/carbonFixation')
})

router.get('/oxygenSupply', checkAuthenticated, async (req, res) => {
    res.render('calcs/oxygenSupply')
})

router.get('/airPurification', checkAuthenticated, async (req, res) => {
    res.render('calcs/airPurification')
})

router.get('/waterPurification', checkAuthenticated, async (req, res) => {
    res.render('calcs/waterPurification')
})

router.get('/climateRegulation', checkAuthenticated, async (req, res) => {
    res.render('calcs/climateRegulation')
})

router.get('/speciesConservation', checkAuthenticated, async (req, res) => {
    res.render('calcs/speciesConservation')
})



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
