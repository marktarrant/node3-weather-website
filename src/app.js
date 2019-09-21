const path = require('path') //node core module which makes it easy to reference to file paths
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000 

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars for dynamic templates
app.set('view engine', 'hbs')
//handlebars automatically looks for a 'views' folder, if you want to rename the folder you require this call
app.set('views', viewPath)
//configures partials and points to the partials path
hbs.registerPartials(partialsPath)


//prioritsied over app.get(root)
//opens up the public folder to the browser
app.use(express.static(publicDirectoryPath))

//route for index.hbs
app.get('', (req, res) => {
    //use res.render for dynamic pages with hbs as opposed to res.send
    //first argument is the page to reference, no need to include a file path, the second argument is an object which opens up variables to use in your page. 
    res.render('index', {
        title: 'Weather', 
        name: 'Mark Tarrant'
    })
})

//route for about.hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Mark Tarrant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        message: 'Help is on the way',
        name: 'Mark Tarrant'
    })
})

//weather page
app.get('/weather', (req, res) => {
    //if no address provided then error
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {
        //geocode function call with callback function passed in
        //have passed in default parameters for latitude,longitude and location as an empty object to stop the server crashing when an error occurs, it uses the error parameter but also tries to destructure these items but they do not exist which throws an error
        geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {
            if(error) {
                //return statement prevents forecast function running if an error is present as there will not be the paramaters to pass to the function
                return res.send({
                    error
                })
            } 
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData, 
                    location, //shorthand for location: location
                    address: req.query.address
                })
            })
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 error, help article not found',
        name: 'Mark Tarrant'
    })
})

//404 page has to be last, use of * means match everything that hasnt been matched previously, its a wildcard character
app.get('*', (req, res, err) => {
    res.render('404', {
        title: '404',
        message: '404 error, page not found', 
        name: 'Mark Tarant'
    })
})

//start up the server, only called once, first argument is the port to run the server on
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

