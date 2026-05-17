const Recipe = require('../models/Recipe');

const getAllRecipes = async (category) => {
  const filter = category ? { category: { $regex: new RegExp(`^${category}$`, 'i') } } : {};
  return Recipe.find(filter).sort({ createdAt: -1 });
};

const getRecipeById = async (id) => {
  return Recipe.findById(id);
};

const createRecipe = async (recipeData) => {
  if (recipeData.cookingTime !== undefined && recipeData.cookingTime <= 0) {
    throw new Error('Cooking time must be a positive number');
  }
  return Recipe.create(recipeData);
};

const updateRecipe = async (id, updates) => {
  if (updates.cookingTime !== undefined && updates.cookingTime <= 0) {
    throw new Error('Cooking time must be a positive number');
  }
  return Recipe.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};

const deleteRecipe = async (id) => {
  return Recipe.findByIdAndDelete(id);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
