require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const recipeRoutes = require('./src/routes/recipeRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Global Kitchen API', endpoints: { recipes: '/recipes' } });
});

app.use('/recipes', recipeRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
