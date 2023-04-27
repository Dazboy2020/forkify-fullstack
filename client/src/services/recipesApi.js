import axios from 'axios';

class RecipesApi {
	constructor() {
		this._apiUrl = '/api/recipes';
	}

	getRecipesfromDB() {
		return axios.get(this._apiUrl);
	}

	bookmarkRecipe(data) {
		return axios.post(this._apiUrl, data);
	}

	deleteRecipeMongo(id) {
		return axios.delete(`${this._apiUrl}/${id}`);
	}
}

export default new RecipesApi();
