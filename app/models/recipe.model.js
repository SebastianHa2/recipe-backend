const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Recipe = sequelize.define('recipe', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    instructions: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
    duration: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    }
})

module.exports = Recipe