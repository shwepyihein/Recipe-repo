import { recipeSchema } from '@/schema/recipeSchema';
import { unValidSchemaRecipe, validSchemaRecipe } from '../__mockData__/recipe';

describe('Schema validation', () => {
  test('Valid schema with Recip', async () => {
    const validData = {
      ...validSchemaRecipe,
    };

    await expect(recipeSchema.validate(validData)).resolves.not.toThrow();
  });

  test('unValid schema', async () => {
    const validData = {
      ...unValidSchemaRecipe,
    };

    await expect(recipeSchema.validate(validData)).rejects.toThrow();
  });
});
