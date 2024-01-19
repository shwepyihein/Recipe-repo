import { cn } from '@/lib/utils';
import { PlusCircleIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import UseRecipeUpdate from './hooks/useRecipeUpdate';

export default function UpdateRecipeForm() {
  const {
    handleSubmit,
    onSubmit,
    register,
    watch,
    errors,
    submitError,
    existError,
    addIngredient,
    removeIngredient,
    loading,
    isDirty,

    setValue,
  } = UseRecipeUpdate();

  return (
    <div className="flex max-w-3xl mx-auto my-10 h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
      <div className="px-5 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <p className=" capitalize text-xl font-semibold leading-6 text-gray-900">
            Update the Recipe
          </p>
          <div className="ml-3 flex h-7 items-center">
            <Link
              href="/"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Title <span className="text-red-400">*</span>
            </label>

            <input
              {...register('title')}
              className={cn(
                'block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm',
              )}
              id="title"
              placeholder="Fluffy Pancakes"
            />
            {errors.title && (
              <p className="text-sm mt-3 px-2 text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Category <span className="text-red-400">*</span>
            </label>
            <select
              value={watch('category')}
              {...register('category')}
              onChange={(e) => setValue('category', e.target.value)}
              className="block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {errors.category && (
              <p className="text-sm mt-3 px-2 text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="mt-5 ">
            <label
              htmlFor="ingredient"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              <p className="pb-2">
                Ingredients <span className="text-red-400">*</span>
              </p>
              <div className="block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm">
                <div className="flex  mt-2 flex-wrap gap-x-3 gap-y-1">
                  {watch('ingredients')?.map(
                    (ingredient: string, idx: number) => (
                      <div className="flex " key={idx}>
                        <p className="text-sm items-center flex gap-2 text-black px-2 py-1 bg-gray-300 rounded-full">
                          {ingredient}
                          <span
                            onClick={() => {
                              removeIngredient(ingredient);
                            }}
                            className="cursor-pointer"
                          >
                            <XIcon className="h-3 w-3" aria-hidden="true" />
                          </span>
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <div className="flex items-end">
                  <input
                    id="ingredient"
                    {...register('ingredient')}
                    className="block w-full mt-5  outline-none appearance-none   bg-secondary-gray   placeholder-gray-400  sm:text-sm"
                  />
                  {watch('ingredient')?.length !== 0 && (
                    <p className="text-xs text-gray-600">
                      {existError ? 'Already Exist' : 'Please Press Add Icon'}
                    </p>
                  )}

                  <div onClick={addIngredient} className="cursor-pointer">
                    <PlusCircleIcon className="w-8 h-8" />
                  </div>
                </div>
              </div>
              {errors.ingredients && (
                <p className="text-sm mt-3 px-2 text-red-400">
                  {errors.ingredients.message}
                </p>
              )}
            </label>
          </div>

          <div className="mt-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              placeholder="How to cook ?"
              {...register('description')}
              id="description"
              name="description"
              rows={5}
              className="block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm"
            />
            {errors.description && (
              <p className="text-sm mt-3 px-2 text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        {submitError && (
          <p className="text-sm text-center mt-3 px-2 text-red-400">
            {submitError.message}
          </p>
        )}
        <div className="flex gap-3 px-5 justify-end">
          <button
            type="submit"
            disabled={!isDirty || loading}
            className="capitalize disabled:bg-gray-400 px-5 py-2 text-sm mt-5  bg-black text-white transition-colors duration-200 border rounded-lg sm:w-auto"
          >
            {loading ? 'loading ...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}
