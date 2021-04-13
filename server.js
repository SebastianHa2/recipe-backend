const express = require('express')
const cors = require('cors')
const session = require('express-session')
const sessionSequelizeStore = require('connect-session-sequelize')(session.Store)
const history = require('connect-history-api-fallback')

const db = require('./app/util/database')
const recipeRoutes = require('./app/routes/recipe.routes')
const cookRoutes = require('./app/routes/cook.routes')
const { sequelize } = require('./app/models/recipe.model')
const Recipe = require('./app/models/recipe.model')
const Cook = require('./app/models/cook.model')

const app = express()

app.set("trust proxy", 1);
app.use(history())

// CORS will allow cross origin request sharing on our web server
const corsOptions = {
    credentials: true
}

app.use(cors(corsOptions))


app.use(session({
    secret: 'long secret of misery',
    saveUninitialized: false,
    resave: false,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    },
    store: new sessionSequelizeStore({
        db: db
    })
}))

// Tell express to parse any requests of content-type application/json
app.use(express.json())

// Tell express to parse any requests of content-type application/x-www-urlencoded
app.use(express.urlencoded({
    extended: true
}))

app.use('/cooks/', cookRoutes)
app.use('/recipes/', recipeRoutes)


// Handle production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static(__dirname + '/public'))

    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}


Cook.hasMany(Recipe)


// Tell your app to listen to any port specified in an environment variable or fallback to port 8080
const PORT = process.env.PORT || 8080

sequelize.sync()

app.listen(PORT, () => {
    console.log("Server running on " + PORT)
})