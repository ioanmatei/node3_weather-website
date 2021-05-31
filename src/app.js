const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ioan Matei'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ioan Matei'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Ioan Matei'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Please provide an address')
    }
    const { address } = req.query
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
          if (error) {
            return res.send({ error })
        }
            res.send({
                forecast,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ioan Matei',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ioan Matei',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})