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
		recipeID: req.body.recipeID,
		title: req.body.title,
		sourceUrl: req.body.sourceUrl,
		image: req.body.image,
		publisher: req.body.publisher,
		cookingTime: req.body.cookingTime,
		servings: req.body.servings,
		ingredients: req.body.ingredients,
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
		await Recipe.findOneAndDelete(req.body.recipeID);
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
