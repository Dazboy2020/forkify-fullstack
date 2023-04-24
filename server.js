const path = require('path');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');
connectDB();
const app = express();

//*Static folder
app.use(express.static(path.join(__dirname, 'public')));
//* Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to this test API' });
});

const recipesRouter = require('./routes/recipeRoutes');
app.use('/api/recipes', recipesRouter);
app.listen(port, () => console.log(`Listening on ${port}`));
