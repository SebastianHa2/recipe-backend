const Sequelize = require('sequelize').Sequelize

// new Sequelize('database_name', 'mysql_user', 'mysql_password')

// dialect and host are optional
const sequelize = new Sequelize('recipeDB', 'Sebastian', 'Bananowy', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize