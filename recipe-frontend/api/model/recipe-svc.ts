import { baseAPI } from '../client';

export const deleteRecipe = (id?: string) => {
  return baseAPI.delete(`/recipes/${id}`);
};

export const createRecipe = (newData: RecipeType) => {
  return baseAPI.post('/recipes', newData);
};

export const updateRecipe = (id: string | undefined, data: RecipeType) => {
  return baseAPI.put(`/recipes/${id}`, data);
};

export const fetchallRecipes = (page: string | number) => {
  return baseAPI.get('/recipes');
};

export const fetchRecipeDetail = (id: string) => {
  return baseAPI.get(`/recipes/${id}`);
};
