import { recipeList } from '@/__test__/__mockData__/recipe';
import RecipeList from '@/components/recipe/list/components/recipeList';
import { act, fireEvent, render, screen } from '@testing-library/react';

const mockLoading = false;
const mockSearchInput = '';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('RecipeList', () => {
  it('renders loading state', () => {
    render(
      <RecipeList
        data={[]}
        loading={true}
        searchInput={''}
        handleDelete={() => {}}
      />,
    );
    expect(screen.getByText('loading ...')).toBeInTheDocument();
  });

  it('renders no data state', () => {
    render(
      <RecipeList
        data={[]}
        loading={false}
        searchInput={''}
        handleDelete={() => {}}
      />,
    );
    expect(screen.getByText('there is no data...')).toBeInTheDocument();
  });

  it('renders recipes with search input', () => {
    render(
      <RecipeList
        data={recipeList}
        loading={mockLoading}
        searchInput={'Healthy'}
        handleDelete={() => {}}
      />,
    );

    // Verify that the recipe with the title 'Healthy' is rendered
    expect(screen.getByText('Healthy Oatmeal Bowl')).toBeInTheDocument();
  });

  it('calls handleDelete when delete button is clicked', () => {
    const handleDeleteMock = jest.fn();
    render(
      <RecipeList
        data={recipeList}
        loading={mockLoading}
        searchInput={mockSearchInput}
        handleDelete={handleDeleteMock}
      />,
    );

    // Click the delete button for the first recipe
    act(() => {
      fireEvent.click(screen.getByTestId('delete-button-0'));
    });

    // Verify that handleDelete is called with the correct ID
    expect(handleDeleteMock).toHaveBeenCalled();
  });
});
