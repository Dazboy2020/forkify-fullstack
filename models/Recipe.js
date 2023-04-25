const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
	recipeID: {
		type: String,
	},
	bookmarked: {
		type: Boolean,
		default: true,
	},
	title: {
		type: String,
	},
	sourceUrl: {
		type: String,
	},
	image: {
		type: String,
	},
	publisher: {
		type: String,
	},
	cookingTime: {
		type: Number,
	},
	servings: {
		type: Number,
	},
	ingredients: {
		type: Array,
	},
});

module.exports = mongoose.model('Recipe', RecipeSchema);
