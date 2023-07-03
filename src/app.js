const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

// Defining paths for express config
publicDirPath = path.join(__dirname, '../public')
viewsPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')

// Setting up handlebars and views file path
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arjun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arjun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page',
        name: 'Arjun'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address not provided'
        })
    }
    res.send({
        location: 'Bangalore',
        weather_description: 'Overcast',
        temperature: 28,
        feelsLike: 25,
        address: req.query.address
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term not provided'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Arjun',
        message: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arjun',
        message: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
