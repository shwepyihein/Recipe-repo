// hooks/useLogin.ts

import { deleteRecipe, fetchallRecipes } from '@/api/model/recipe-svc';
import { ChangeEvent, useEffect, useState } from 'react';

const useRecipeList = () => {
  const [recipeList, setRecipeList] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      const { data } = await fetchallRecipes(1);
      setRecipeList(data);
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRecipe(id);
      fetchRecipe();
    } catch (error) {}
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  return {
    handleSearchInput,
    searchInput,
    recipeList,
    fetchLoading,
    handleDelete,
  };
};

export default useRecipeList;
