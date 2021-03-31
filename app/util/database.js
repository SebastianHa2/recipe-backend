const Sequelize = require('sequelize').Sequelize

// new Sequelize('database_name', 'mysql_user', 'mysql_password')

// dialect and host are optional
const sequelize = new Sequelize('heroku_8915a890696307d', 'b8fd580a23f692', '11b61a78', {
    dialect: 'mysql',
    host: 'eu-cdbr-west-01.cleardb.com'
})

module.exports = sequelize
