const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

const {
	getAllRecipes,
	getSingleRecipe,
	addNewRecipe,
	editRecipe,
	deleteRecipe,
} = require('../routes/routeHandler');

router.get('/', getAllRecipes);

router.get('/:id', getSingleRecipe);

router.post('/', addNewRecipe);

router.put('/:id', editRecipe);

router.delete('/:id', deleteRecipe);

module.exports = router;
