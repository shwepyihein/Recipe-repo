import RecipeListPage from '@/components/recipe/list';
import { render } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  refersh: jest.fn(),
  useParams: jest.fn(),
}));

describe('Home', () => {
  test('Recipe Render', () => {
    render(<RecipeListPage />);
  });
});
