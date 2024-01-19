export const recipeList = [
  {
    id: 3,
    title: 'Healthy Oatmeal Bowl',
    category: 'Breakfast',
    description: 'Nutritious oatmeal with fruits and nuts',
    ingredients: ['oats', 'milk', 'banana', 'berries', 'nuts'],
  },
  {
    id: 4,
    title: 'Classic Bacon and Eggs',
    category: 'Breakfast',
    description: 'Traditional breakfast with crispy bacon and eggs',
    ingredients: ['bacon', 'eggs', 'toast'],
  },
  {
    id: 5,
    title: 'Avocado Toast with Poached Eggs',
    category: 'Breakfast',
    description: 'Avocado spread on toast topped with poached eggs',
    ingredients: ['avocado', 'bread', 'eggs'],
  },
  {
    id: 6,
    title: 'Blueberry Muffins',
    category: 'Breakfast',
    description: 'Moist muffins filled with fresh blueberries',
    ingredients: ['flour', 'sugar', 'blueberries', 'butter', 'eggs'],
  },
];

export const validSchemaRecipe = {
  title: 'Healthy Oatmeal Bowl',
  category: 'Breakfast',
  description: 'Nutritious oatmeal with fruits and nuts',
  ingredients: ['oats', 'milk', 'banana', 'berries', 'nuts'],
};

export const unValidSchemaRecipe = {
  title: 'Healthy Oatmeal Bowl',
  category: 'Breakfast',
  description: 'Nutritious oatmeal with fruits and nuts',
  ingredients: [],
};
