// useRecipeList.test.ts

import * as api from '@/api/model/recipe-svc';
import useRecipeList from '@/components/recipe/list/hooks/useRecipeList';
// import { act, renderHook } from '@testing-library/react-hooks';

import { act, renderHook, waitFor } from '@testing-library/react';
import { recipeList } from '../__mockData__/recipe';

jest.mock('../../api/model/recipe-svc');

describe('useRecipeList', () => {
  test('should fetch recipes on mount', async () => {
    (api.fetchallRecipes as jest.Mock).mockResolvedValue({
      data: recipeList,
    });

    let renderResult: any;

    // Use act to handle asynchronous behavior
    await act(async () => {
      // Render the hook
      const { result } = renderHook(() => useRecipeList());
      renderResult = result;
    });

    await waitFor(() => {
      // Access the result after the initial update
      expect(renderResult.current.fetchLoading).toBe(false);
      expect(renderResult.current.recipeList).toBe(recipeList);
    });
  });

  test('should handle search input change', async () => {
    let renderResult: any;

    // Use act to handle asynchronous behavior
    await act(async () => {
      // Render the hook
      const { result } = renderHook(() => useRecipeList());
      renderResult = result;
    });

    act(() => {
      renderResult.current.handleSearchInput({
        target: { value: 'searchValue' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(renderResult.current.searchInput).toBe('searchValue');
  });

  test('should handle recipe deletion', async () => {
    (api.deleteRecipe as jest.Mock).mockResolvedValueOnce({});
    (api.fetchallRecipes as jest.Mock).mockResolvedValue({
      data: recipeList,
    });

    let renderResult: any;

    // Use act to handle asynchronous behavior
    await act(async () => {
      // Render the hook
      const { result } = renderHook(() => useRecipeList());
      renderResult = result;
    });
    await act(async () => {
      renderResult.current.handleDelete('1');
    });

    expect(api.deleteRecipe).toHaveBeenCalledWith('1');
  });
});
