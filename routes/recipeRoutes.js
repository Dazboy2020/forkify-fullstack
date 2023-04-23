const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { findByIdAndDelete } = require('../models/Recipe');

//* Get all recipes
router.get('/', async (req, res) => {
	try {
		const recipes = await Recipe.find();
		res.json({ success: true, data: recipes });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Something went wrong' });
	}
});

//*Get A single recipe
router.get('/:id', async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		res.json({ success: true, data: recipe });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Something went wrong' });
	}
});

//* Add a new recipe
router.post('/', async (req, res) => {
	const recipe = new Recipe({
		text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
	});
	try {
		const newRecipe = await recipe.save();
		res.json({ success: true, data: newRecipe });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Something went wrong' });
	}
});

//* Update recipe
router.put('/:id', async (req, res) => {
	try {
		const updatedRecipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					text: req.body.text,
					tag: req.body.tag,
				},
			},
			{ new: true }
		);
		res.json({ success: true, data: updatedRecipe });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Something went wrong!' });
		console.log(error);
	}
});

//* Delete a recipe
router.delete('/:id', async (req, res) => {
	try {
		await Recipe.findByIdAndDelete(req.params.id);
		res.json({ success: true, data: {} });
	} catch {
		res.status(500).json({ success: false, error: 'Something went wrong!' });
	}
});

module.exports = router;
