import { Dialog, Transition } from '@headlessui/react';
import {
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import classNames from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { mutate } from 'swr';
import { client } from '@/api/client';

type SlideOverProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  type: 'create' | 'update';
  updateData?: RecipeType;
};

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  ingredients: yup
    .array()
    .min(1, 'At least one ingredient is required')
    .required('Ingredients are required'),
  ingredient: yup.string(),
  id: yup.string(),
});

export default function SlideOver({
  updateData,
  type,
  open,
  setOpen,
}: SlideOverProps) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: '',
      title: '',
      category: 'Breakfast',
      description: '',
      ingredients: [],
      ingredient: '',
    },
    resolver: yupResolver(schema),
  });

  const [existError, setExistError] = useState(false);

  useEffect(() => {
    if (type === 'update') {
      reset(updateData);
    }
  }, [type, updateData]);

  const onSubmit = async (data: FieldValues) => {
    const newData = {
      title: data.title,
      category: data.category,
      description: data.description,
      ingredients: data.ingredients,
    };
    if (type === 'create') {
      await client.post('/recipes', newData).then((res) => {
        mutate('/recipes');
        setOpen(false);
        reset({
          title: '',
          category: 'Breakfast',
          description: '',
          ingredients: [],
          ingredient: '',
        });
      });
    } else {
      await client.put(`/recipes/${updateData?.id}`, newData).then((res) => {
        mutate('/recipes');
        setOpen(false);
        reset({
          title: '',
          category: 'Breakfast',
          description: '',
          ingredients: [],
          ingredient: '',
        });
      });
    }
  };

  const addIngredient = () => {
    const oldIngredients = getValues('ingredients');

    const Exist = oldIngredients.find((g) => g === watch('ingredient'));
    if (Exist) {
      setExistError(true);
      return;
    }

    const newIngredients = [...oldIngredients, getValues('ingredient')];
    setValue('ingredients', newIngredients);
    setValue('ingredient', '');
    setExistError(false);
  };

  const removeIngredient = (value: string) => {
    const oldIngredients = getValues('ingredients');
    const newIngredients = oldIngredients.filter((item) => item !== value);
    setValue('ingredients', newIngredients);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-5 py-8 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className=" capitalize text-xl font-semibold leading-6 text-gray-900">
                          {type} the Recipe
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
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
                            className={classNames(
                              'block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm'
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
                            onChange={(e) =>
                              setValue('category', e.target.value)
                            }
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
                              Ingredients{' '}
                              <span className="text-red-400">*</span>
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
                                          <XMarkIcon
                                            className="h-3 w-3"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </p>
                                    </div>
                                  )
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
                                    {existError
                                      ? 'Already Exist'
                                      : 'Please Press Add Icon'}
                                  </p>
                                )}

                                <div
                                  onClick={addIngredient}
                                  className="cursor-pointer"
                                >
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
                      <div className="flex gap-3 px-5 justify-end">
                        <button
                          onClick={() => {
                            setOpen(false);
                          }}
                          type="button"
                          className="capitalize px-5 py-2 text-sm mt-5  text-gray-600 bg-white transition-colors duration-200 border rounded-lg sm:w-auto"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="capitalize px-5 py-2 text-sm mt-5  bg-black text-white transition-colors duration-200 border rounded-lg sm:w-auto"
                        >
                          {type}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
