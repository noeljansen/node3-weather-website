const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath) //tells Express / hbs where to find the views instead of using the default views folder
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Noel"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mr Robot"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help message",
    name: "Noel"
  })
})

// app.get('',(req, res) => {           //no longer used. the static code above is used as default route
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Noel',
//         age: 27
//     },
//     {
//         name: 'Sam',
//         age: 35
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })
//Test comment

app.get("/weather", (req, res) => {
  // const address = req.query.address;   //This did not work!
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
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
        location: location,
        address: req.query.address
      })

      console.log(location)
      console.log(forecastData)
      console.log(req.query.address)
    })
  }
  )
})

//Only 1 response per request is allowed
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term"
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help Page not found",
    errorMessage: "Help artical not found",
    name: "Noel"
  })
})

//404 Page. Needs to be the last app.get in the program
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page not found",
    errorMessage: "Page not found",
    name: "Noel"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000")
})
