const express = require('express')

const recipeController = require('../controllers/recipe.controller')

const router = express.Router()

// Retrieve all recipes 
router.get('/', recipeController.fetchAllRecipes)

// Create a recipe when a post request to /add-recipe is sent
router.post('/add-recipe', recipeController.createRecipe)

// Update a specific recipe
router.put('/recipe/edit-recipe/:id', recipeController.updateRecipe)

// Delete a specific recipe
router.delete('/recipe/:id', recipeController.deleteOneRecipe)

// Retrieve a specific recipe
router.get('/recipe/:id', recipeController.fetchOneRecipe)

module.exports = router
