const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const calcs = require('../models/calcs')
const uploadPath = 'geo_modules/geodata/fileUpload/tif'

const upload = multer({ dest: uploadPath })

const PythonShell = require('python-shell').PythonShell

router.get('/', checkAuthenticated, async (req, res) => {
    res.redirect('/')
})

router.get('/waterConservation', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/waterConservation', { message: "" })
})

router.post('/waterConservation', checkAuthenticated, upload.fields([{ name: 'f1', maxCount: 1 }, { name: 'f2', maxCount: 1 }, { name: 'f3', maxCount: 1 }]), async (req, res) => {
    try {
        fp1 = req.files['f1'][0].path
        fp2 = req.files['f2'][0].path
        fp3 = req.files['f3'][0].path
        year = req.body.year
        price = req.body.t1
        let options = {
            args: [fp1, fp2, fp3, year, price]
        }
        PythonShell.run('./geo_modules/waterConservation.py', options, async function (err, result) {
            if (err) {
                console.log(err)
                res.render('calcs/waterConservation', { message: err })
            } else {
                const check = await calcs.find({ year: year, type_cn: "水源涵养" }).exec()
                if (check.length == 0) {
                    const calc = new calcs({
                        year: year,
                        type_cn: "水源涵养",
                        type_en: "waterConservation",
                        value: result.toString()
                    })
                    const newCalc = await calc.save()
                } else {
                    let calc
                    calc = await calcs.findOne({ year: year, type: "水源涵养" })
                    calc.value = result.toString()
                    await calc.save()
                }
                res.redirect('/')
            }
        })
    } catch (err) {
        res.render('calcs/waterConservation', { message: err })
    }
})

router.get('/soilConservation', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/soilConservation', { message: "" })
})

router.post('/soilConservation', checkAuthenticated, upload.fields([
    { name: 'f1', maxCount: 1 },
    { name: 'f2', maxCount: 1 },
    { name: 'f3', maxCount: 1 },
    { name: 'f4', maxCount: 1 },
    { name: 'f5', maxCount: 1 },
    { name: 'f6', maxCount: 1 }]), async (req, res) => {
        try {
            fp1 = req.files['f1'][0].path
            fp2 = req.files['f2'][0].path
            fp3 = req.files['f3'][0].path
            fp4 = req.files['f4'][0].path
            fp5 = req.files['f5'][0].path
            fp6 = req.files['f6'][0].path
            year = req.body.year
            let options = {
                args: [fp1, fp2, fp3, fp4, fp5, fp6, year]
            }
            PythonShell.run('./geo_modules/soilConservation.py', options, async function (err, result) {
                if (err) {
                    console.log(err)
                    res.render('calcs/soilConservation', { message: err })
                }
                console.log(result)
                const check = await calcs.find({ year: year, type_cn: "土壤保持" }).exec()
                if (check.length == 0) {
                    const calc = new calcs({
                        year: year,
                        type_cn: "土壤保持",
                        type_en: "soilConservation",
                        value: result.toString()
                    })
                    const newCalc = await calc.save()
                } else {
                    let calc
                    calc = await calcs.findOne({ year: year, type: "土壤保持" })
                    calc.value = result.toString()
                    await calc.save()
                }
                res.redirect('/')
            })
        } catch (err) {
            res.render('calcs/soilConservation', { message: err })
        }
    })

router.get('/windbreakAndSandFixation', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/windbreakAndSandFixation')
})

router.get('/floodControl', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/floodControl')
})

router.get('/carbonFixation', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/carbonFixation')
})

router.get('/oxygenSupply', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/oxygenSupply')
})

router.get('/airPurification', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/airPurification')
})

router.get('/waterPurification', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/waterPurification')
})

router.get('/climateRegulation', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
    res.render('calcs/climateRegulation')
})

router.get('/speciesConservation', checkAuthenticated, async (req, res) => {
    var user = await req.user
    res.locals.islogin = req.isAuthenticated()
    res.locals.name = user.name
    res.locals.id = user.id
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
