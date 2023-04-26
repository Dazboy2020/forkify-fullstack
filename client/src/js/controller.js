import * as model from './model.js';
import { MODAL_CLOSE_SECONDS } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../sass/main.scss';
import '../img/favicon.png';
import '../img/icons.svg';
import '../img/favicon.png';
import '../img/logo.png';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		//? Update View to mark selected search result
		resultsView.update(model.getSearchResultsPage());
		bookmarksView.update(model.state.bookmarks);

		//? Loading Recipe
		await model.loadRecipe(id);

		//? Render Recipe
		recipeView.render(model.state.recipe);
	} catch (err) {
		alert(err);
		recipeView.renderError();
	}
};

const controlSearchResults = async function () {
	try {
		resultsView.renderSpinner();
		//* Get seach results
		const query = searchView.getQuery();
		if (!query) return;

		//*load Search Results
		await model.loadSearchResults(query);

		//* Render Results
		// resultsView.render(model.state.search.results);
		resultsView.render(model.getSearchResultsPage());

		//* Render Initial Pagination
		paginationView.render(model.state.search);
	} catch (err) {
		console.log(err);
	}
};

const controlPagination = function (gotoPage) {
	//* Render NEW results
	resultsView.render(model.getSearchResultsPage(gotoPage));
	//* Render NEW pagination buttons
	paginationView.render(model.state.search);

	console.log(gotoPage);
};

const controlServings = function (newServings) {
	//* Update recipe servings (in state)
	model.updateServings(newServings);

	//* Update the recipe view
	// recipeView.render(model.state.recipe);
	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	//* Add/remove bookmark
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.deleteBookmark(model.state.recipe.id);

	//* Update recipe view
	recipeView.update(model.state.recipe);

	//* Render Bookmarks
	bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
	bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
	try {
		//* Loading spinner
		addRecipeView.renderSpinner();

		//*Upload new recipe
		await model.uploadRecipe(newRecipe);

		//* Render recipe
		recipeView.render(model.state.recipe);

		//* Display success message
		addRecipeView.renderMessage();

		//* Render Bookmarks view
		bookmarksView.render(model.state.bookmarks);

		//* Change URL ID
		window.history.pushState(null, '', `#${model.state.recipe.id}`);

		//*Close form
		setTimeout(function () {
			addRecipeView.toggleWindow();
		}, MODAL_CLOSE_SECONDS * 1000);
	} catch (err) {
		console.error('😠', err);
		addRecipeView.renderError(err.message);
	}
};

const init = function () {
	bookmarksView.addHandlerRender(controlBookmarks);
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSeach(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
