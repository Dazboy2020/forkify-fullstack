const Recipe = require('../models/Recipe');

async function getAllRecipes(req, res) {
	try {
		const recipes = await Recipe.find();
		res.json({ success: true, data: recipes });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Something went wrong' });
	}
}

async function getSingleRecipe(req, res) {
	try {
		const recipe = await Recipe.findById(req.params.id);
		res.json({ success: true, data: recipe });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Something went wrong' });
	}
}

async function addNewRecipe(req, res) {
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
}

async function editRecipe(req, res) {
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
}

async function deleteRecipe(req, res) {
	try {
		await Recipe.findByIdAndDelete(req.params.id);
		res.json({ success: true, data: {} });
	} catch {
		res.status(500).json({ success: false, error: 'Something went wrong!' });
	}
}

module.exports = {
	getAllRecipes,
	getSingleRecipe,
	addNewRecipe,
	editRecipe,
	deleteRecipe,
};
