const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

const recipeRoutes = require('./app/routes/recipe.routes')
const cookRoutes = require('./app/routes/cook.routes')
const { sequelize } = require('./app/models/recipe.model')
const Recipe = require('./app/models/recipe.model')
const Cook = require('./app/models/cook.model')

const app = express()

app.set("trust proxy", 1)

app.use(history())

// CORS will allow cross origin request sharing on our web server
const corsOptions = {
    credentials: true
}

app.use(cors(corsOptions))

const csrfProtection = csrf({cookie: true})

app.use(cookieParser())

app.use(csrfProtection)


// Tell express to parse any requests of content-type application/json
app.use(express.json())

// Tell express to parse any requests of content-type application/x-www-urlencoded
app.use(express.urlencoded({
    extended: true
}))

app.use((req, res, next)=> {

    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
  
    next();
  });
  

app.use('/cooks/', cookRoutes)
app.use('/recipes/', recipeRoutes)


// Handle production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static(__dirname + '/public'))

    // // Handle SPA
    // app.get(/.*/, (req, res) => {
    //     res.sendFile(__dirname + '/public/index.html')
    // })
}


Cook.hasMany(Recipe)


// Tell your app to listen to any port specified in an environment variable or fallback to port 8080
const PORT = process.env.PORT || 8080

sequelize.sync()

app.listen(PORT, () => {
    console.log("Server running on " + PORT)
})