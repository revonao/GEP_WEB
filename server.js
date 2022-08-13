if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const flash = require("express-flash")
const session = require("express-session")
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const addRouter = require('./routes/add')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(methodOverride('_method'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/add', addRouter)

app.listen(process.env.PORT || 4000)