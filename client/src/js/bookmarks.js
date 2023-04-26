import axios from 'axios';
import RecipesApi from '../services/recipesApi.js';
import { async } from 'regenerator-runtime';

export async function addRecipetoBookmarks(recipe) {
	try {
		const newBookmark = {
			recipeID: recipe.id,
			bookmarked: true,
			title: recipe.title,
			sourceUrl: recipe.sourceUrl,
			image: recipe.image,
			publisher: recipe.publisher,
			cookingTime: recipe.cookingTime,
			servings: recipe.servings,
			ingredients: recipe.ingredients,
		};
		console.log(newBookmark);
		await RecipesApi.bookmarkRecipe(newBookmark);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteBookmarkMongo(recipe) {
	try {
		await RecipesApi.deleteRecipeMongo(recipe);
	} catch (error) {
		console.log(error);
	}
}

async function getRecipes() {
	try {
		const recipe = await RecipesApi.getRecipesfromDB();
		console.log(recipe.data.data);
	} catch (error) {
		console.log(`Something went wrong ${error}`);
	}
}

getRecipes();
