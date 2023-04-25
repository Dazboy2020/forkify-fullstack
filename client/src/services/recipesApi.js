import axios from 'axios';

class RecipesApi {
	constructor() {
		this._apiUrl = 'http://localhost:5000/api/recipes';
	}

	getRecipesfromDB() {
		return axios.get(this._apiUrl);
	}

	bookmarkRecipe(data) {
		return axios.post(this._apiUrl, data);
	}
}

export default new RecipesApi();
