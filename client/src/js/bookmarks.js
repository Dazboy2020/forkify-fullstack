import axios from 'axios';
import RecipesApi from '../services/recipesApi.js';
import { async } from 'regenerator-runtime';
import { state } from './model.js';

export async function addRecipetoBookmarks(recipe) {
	try {
		const newBookmark = {
			id: recipe.id,
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

export async function deleteBookmarkMongo(id) {
	try {
		await RecipesApi.deleteRecipeMongo(id);
	} catch (error) {
		console.log(error);
	}
}

export async function getRecipes() {
	try {
		const recipe = await RecipesApi.getRecipesfromDB();
		if (!recipe) return;
		recipe.data.data.forEach((rec) => {
			state.bookmarks.push(rec);
		});
		console.log(state.bookmarks);
	} catch (error) {
		console.log(`Something went wrong ${error}`);
	}
}

getRecipes();
