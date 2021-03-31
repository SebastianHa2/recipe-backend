const express = require('express')
const cors = require('cors')

const db = require('./app/util/database')
const recipeRoutes = require('./app/routes/recipe.routes')
const cookRoutes = require('./app/routes/cook.routes')
const { sequelize } = require('./app/models/recipe.model')
const Recipe = require('./app/models/recipe.model')
const Cook = require('./app/models/cook.model')

const app = express()

// Tell express to parse any requests of content-type application/json
app.use(express.json())

// Tell express to parse any requests of content-type application/x-www-urlencoded
app.use(express.urlencoded({
    extended: true
}))

// CORS will allow cross orgigin request sharing on our web server
const corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

app.use('/recipes/', recipeRoutes)
app.use('/cooks/', cookRoutes)


Cook.hasMany(Recipe)


// Tell your app to listen to any port specified in an environment variable or fallback to port 8080
const PORT = process.env.PORT || 8080

sequelize.sync()

app.listen(PORT, () => {
    console.log("Server running on " + PORT)
})