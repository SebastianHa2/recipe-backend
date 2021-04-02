const Recipe = require('../models/recipe.model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.createRecipe = (req, res) => {
    // We will get all the needed data in the request body from our 
    // front end
    const recipe = {
        title: req.body.title,
        instructions: req.body.instructions,
        duration: req.body.duration,
        cookId: req.body.cookId,
        imageUrl: req.body.imageUrl
    }

    // Create an entry in the database using the recipe object
    Recipe.create(recipe).then(data => {
        res.send({
            message: "Recipe was created successfully"
        })
    }).catch(err => {
        res.status(400).send({
            message: err.message || "There was an error creating the recipe..." 
        })
    })
}

exports.fetchAllRecipes = (req, res) => {
    // Get all recipes from the database
    Recipe.findAll().then(data => {
        // Send the data back to our front end
        console.log(req.session.loggedIn)
        res.send(data)
    }).catch(err => {
        res.send({
            message: err.message || "Something went wrong while retrieving the recipes"
        })
    })
}

exports.fetchByTitle = (req, res) => {
    // We are receiving the title in a query
    const titlePart = req.query.title
    // Create a condition for the where MySQL clause
    // This will search the database titles for any titles containing the titlePart
    const condition = {title : {[Op.like]: `%${titlePart}%`}}
    Recipe.findAll({where: condition}).then(data => {
        // We send the data back to the front end
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Something went wrong while looking for ${titlePart}`
        })
    })
}

exports.fetchOneRecipe = (req, res) => {
    // We are receiving the id in the URL parameters
    const id = req.params.id
    // Fetching a recipe by their primary key / id
    Recipe.findByPk(id).then(data => {
        // Send the data back
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Something went wrong while looking for recipe with id ${id}`
        })
    })
}

exports.updateRecipe = (req, res) => {
    // We are receiving the id again in the URL parameters
    // and the updated information in the request body
    const id = req.params.id
    // We specify the where clause to make sure we only update the recipe with the specific id
    // not all the recipes
    Recipe.update(req.body, {
        where: {
            id: id
        }
    }).then(num => {
        if(num === 1){
            res.send({
                message: "Recipe was updated successfully!"
            })
        }else{
            res.send({
                message: `Cannot update recipe with id ${id}, maybe it was not found...`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while updating the recipe..."
        })
    })
}

exports.deleteOneRecipe = (req, res) => {
    // We are receiving the id in the URL parameters
    const id = req.params.id
    Recipe.destroy({
        where: {
            id: id
        }
    }).then(num => {
        if(num === 1){
            res.send({
                message: "Recipe deleted successfully"
            })
        }else{
            res.send({
                message: `Couldn't delete recipe with id ${id}, maybe it was not found...`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while deleting the recipe..."
        })
    })
}

exports.deleteAllRecipes = (req, res) => {
    Recipe.destroy({
        // Setting truncate to true will delete all the recipe entries
        truncate: true
    }).then(nums => {
        res.send({
            message: `Successfully deleted ${nums} recipes!`
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while deleting recipes..."
        })
    })
}