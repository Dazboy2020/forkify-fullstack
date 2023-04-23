const express = require('express');
const router = express.Router();
const recipes = [
	{
		id: 1,
		text: 'this is text 1',
		tag: 'test',
		username: 'daz',
		date: '2002-10-02',
	},
	{
		id: 2,
		text: 'this is text 1',
		tag: 'another test',
		username: 'dazdee',
		date: '2002-10-03',
	},
];

router.get('/', (req, res) => {
	res.json({ success: true, data: recipes });
});

router.get('/:id', (req, res) => {
	const recipe = recipes.find((rec) => rec.id === +req.params.id);
	if (!recipe) {
		return res.status(404).json({ success: false, error: 'Recipe not found' });
	}
	res.json({ success: true, data: recipe });
});

//* Add a new recipe
router.post('/', (req, res) => {
	const newRecipe = {
		id: recipes.length + 1,
		text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
		date: new Date().toISOString().slice(0, 10),
	};

	recipes.push(newRecipe);
	res.json({ success: true, data: newRecipe });
});

//* Update recipe
router.put('/:id', (req, res) => {
	const updateRecipe = recipes.find((rec) => rec.id === +req.params.id);
	if (!updateRecipe) {
		return res.status(404).json({ success: false, error: 'Recipe not found' });
	}

	updateRecipe.text = req.body.text || updateRecipe.text;
	updateRecipe.tag = req.body.tag || updateRecipe.tag;

	res.json({ success: true, data: updateRecipe });
});

//* Delete a recipe
router.delete('/:id', (req, res) => {
	const deleteRecipe = recipes.find((rec) => rec.id === +req.params.id);
	if (!deleteRecipe) {
		return res.status(404).json({ success: false, error: 'Recipe not found' });
	}
	const index = recipes.indexOf(deleteRecipe);
	recipes.splice(index, 1);
	res.json({ success: true, data: {} });
});

module.exports = router;
