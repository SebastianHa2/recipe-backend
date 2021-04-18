const Recipe = require('../models/recipe.model')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { validationResult } = require('express-validator/check')

exports.createRecipe = (req, res) => {
    // We will get all the needed data in the request body from our 
    // front end
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({message: "Validation failed", errors: errors.array()})
    }

    const recipe = {
        title: req.body.title,
        instructions: req.body.instructions,
        duration: req.body.duration,
        cookId: req.body.cookId,
        imageUrl: req.body.imageUrl
    }

    // Create an entry in the database using the recipe object
    Recipe.create(recipe).then(data => {
        res.status(201).json({
            message: "Recipe was created successfully"
        })
    }).catch(err => {
        res.status(400).json({
            message: err.message || "There was an error creating the recipe..." 
        })
    })
}

exports.fetchAllRecipes = (req, res) => {
    // Get all recipes from the database
    const { page, size } = req.query
    let numberOfAllRecipes
    let numberOfPages

    Recipe.findAll().then(allRecipes => {
        numberOfAllRecipes = allRecipes.length

        numberOfPages = Math.ceil(parseInt(numberOfAllRecipes)/parseInt(size))

        console.log(numberOfPages)

        Recipe.findAndCountAll({
            limit: parseInt(size),
            offset: parseInt(page)*parseInt(size)
        }).then(data => {
            // Send the data back to our front end
            res.status(200).json({
                recipes: data,
                numberOfPages: numberOfPages,
                numberOfAllRecipes: numberOfAllRecipes
            })
        }).catch(err => {
            res.status(400).json({
                message: err.message || "Something went wrong while retrieving the recipes"
            })
        })
    }).catch(err => {
        res.status(400).json({
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
        res.status(200).json({
            recipe: data
        })
    }).catch(err => {
        res.status(500).json({
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
        res.status(200).json({
            recipe: data
        })
    }).catch(err => {
        res.status(500).json({
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

    if(!errors.isEmpty()){
        return res.status(422).json({message: "Validation failed", errors: errors.array()})
    }

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
        res.status(500).json({
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
            res.status(204).json({
                message: "Recipe deleted successfully"
            })
        }else{
            res.status(500).json({
                message: `Couldn't delete recipe with id ${id}, maybe it was not found...`
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Something went wrong while deleting the recipe..."
        })
    })
}

exports.deleteAllRecipes = (req, res) => {
    Recipe.destroy({
        // Setting truncate to true will delete all the recipe entries
        truncate: true
    }).then(nums => {
        res.status(204).json({
            message: `Successfully deleted ${nums} recipes!`
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while deleting recipes..."
        })
    })
}