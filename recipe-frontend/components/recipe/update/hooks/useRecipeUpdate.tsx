import { fetchRecipeDetail, updateRecipe } from '@/api/model/recipe-svc';
import { recipeSchema } from '@/schema/recipeSchema';
import { ApiErrorResponse } from '@/types/apiType';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiError } from 'next/dist/server/api-utils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const UseRecipeUpdate = () => {
  const router = useRouter();

  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      id: '',
      title: '',
      category: 'Breakfast',
      description: '',
      ingredients: [],
      ingredient: '',
    },
    resolver: yupResolver(recipeSchema),
  });

  const [existError, setExistError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [submitError, setSubmitError] = useState<ApiError>();

  const fetchRecipe = async () => {
    try {
      const { data } = await fetchRecipeDetail(params?.id as string);
      reset(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    const newData: RecipeType = {
      title: data.title,
      category: data.category,
      description: data.description,
      ingredients: data.ingredients,
    };

    try {
      await updateRecipe(params?.id as string, newData);

      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
      setSubmitError((error as ApiErrorResponse<any>).response?.data);
    }
  };

  const addIngredient = () => {
    const newdata = watch('ingredient');

    if (newdata !== '') {
      const oldIngredients = getValues('ingredients');

      const Exist = oldIngredients.find((g) => g === newdata);
      if (Exist) {
        setExistError(true);
        return;
      }

      const newIngredients = [...oldIngredients, newdata];
      setValue('ingredients', newIngredients);
      setValue('ingredient', '');
      setExistError(false);
    }
  };

  const removeIngredient = (value: string) => {
    const oldIngredients = getValues('ingredients');

    const newIngredients = oldIngredients.filter((item) => item !== value);
    setValue('ingredients', newIngredients);
  };
  return {
    addIngredient,
    removeIngredient,
    onSubmit,
    watch,
    getValues,
    register,
    handleSubmit,
    errors,
    submitError,
    existError,
    isDirty,
    loading,
    setValue,
  };
};

export default UseRecipeUpdate;
