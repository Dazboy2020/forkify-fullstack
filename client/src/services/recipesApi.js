import axios from 'axios';

class RecipesApi {
	constructor() {
		this._apiUrl = 'http://localhost:5000/api/recipes';
	}

	getRecipesfromDB() {
		return axios.get(this._apiUrl);
	}
}

export default new RecipesApi();
