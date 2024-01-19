import * as yup from 'yup';

export const recipeSchema = yup.object().shape({
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
