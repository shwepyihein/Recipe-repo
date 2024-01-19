'use client';
import Link from 'next/link';
import RecipeList from './components/recipeList';
import useRecipeList from './hooks/useRecipeList';

const RecipeListPage = () => {
  const {
    recipeList,
    fetchLoading,
    handleSearchInput,
    handleDelete,
    searchInput,
  } = useRecipeList();
  return (
    <div className="md:max-w-4xl py-10  px-10 mx-auto">
      <div className="flex mt-3 w-full lg:flex-row flex-col-reverse items-center justify-between">
        <div className=" w-full relative rounded-lg shadow-sm max-w-auto  px-5 border py-3 sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            name="search"
            className="outline-none block w-full pl-5 sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter Recipe name"
            value={searchInput}
            onChange={handleSearchInput}
          />
        </div>
        <div className="flex mb-4 lg:mb-0 w-full lg:justify-end justify-between">
          <p className="lg:hidden text-2xl font-bold">Recipes</p>
          <Link
            href="/recipe/create"
            className="w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-black border rounded-lg sm:w-auto"
          >
            Create the Recipe
          </Link>
        </div>
      </div>
      <RecipeList
        data={recipeList}
        loading={fetchLoading}
        searchInput={searchInput}
        handleDelete={handleDelete}
      />
      ;
    </div>
  );
};

export default RecipeListPage;
