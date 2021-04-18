const express = require('express')
const { body } = require('express-validator/check')

const recipeController = require('../controllers/recipe.controller')

const router = express.Router()

// Retrieve all recipes 
router.get('/', recipeController.fetchAllRecipes)

// Create a recipe when a post request to /add-recipe is sent
router.post('/add-recipe', [body('title').isLength({min : 3}).trim(), body('duration').isInt({min: 10}).trim(), body('instructions').isLength({ min: 3}), body('imageUrl').trim().isURL()], recipeController.createRecipe)

// Update a specific recipe
router.put('/recipe/edit-recipe/:id', [body('title').isLength({min : 3}).trim(), body('duration').isInt({min: 10, max: 500}).trim(), body('instructions').isLength({ min: 3}), body('imageUrl').trim().isURL()], recipeController.updateRecipe)

// Delete a specific recipe
router.delete('/recipe/:id', recipeController.deleteOneRecipe)

// Retrieve a specific recipe
router.get('/recipe/:id', recipeController.fetchOneRecipe)

module.exports = router
