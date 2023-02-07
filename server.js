if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRoute = require('./routes/index')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')     // ejs is the engine we are using for views
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(methodOverride('_method'))

app.use('/index', indexRoute)

app.listen(process.env.PORT || 5000);

// for connection to db
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', error => console.log(error))
db.once('open', () => console.log('Mongoose connected successfully'))
