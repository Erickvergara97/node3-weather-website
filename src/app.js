const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)

const app = express()

//Aqui alteramos la ruta del directorio para entrar a la carpeta public y acceder a los documentos html
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Estos son un ejemplo para pasar contenido html y JSON
// app.get('', (request, response) => {
//     response.send('<h1>Weather</h1>')
// })

// app.get('/help', (request, response) => {
//     response.send([{
//         name: 'Erick',
//         age: 25
//     }, {
//         name: 'Daniela',
//         age: 23
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Erick Vergara'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Erick Vergara'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Erick Vergara'
    })
})

app.get('/weather', (request, response) => {
    if(!request.query.address) {
        return response.send({
            error: 'You must provide an address! '
        })
    }

    geocode(request.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return response.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return response.send({ error })
            }

            response.send({
                forecast: forecastData,
                location,
                address: request.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Erick Vergara',
        errorMessage: 'Help article not found.'

    })
})

// el * significa que se ejecute cuando el link no haga match con alguno que ya haya sido establecido
app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Erick Vergara',
        errorMessage: 'Page not found.'

    })
})

// app.com
// app.com/help
// app.com/about


//Inicializamos el servidor 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})