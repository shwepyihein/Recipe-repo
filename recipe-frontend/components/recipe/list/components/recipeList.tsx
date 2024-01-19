import { PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type RecipeListProps = {
  searchInput: string;
  data: RecipeType[];
  loading: boolean;
  handleDelete: (id: number) => void;
};

const RecipeList = ({
  data,
  loading,
  searchInput,
  handleDelete,
}: RecipeListProps) => {
  const router = useRouter();

  const filteredRecipes = data.filter((recipe: RecipeType) => {
    // Split the search query into individual words
    const searchWords = searchInput.toLowerCase().split(' ');

    // Check if any of the words match the recipe's title
    return searchWords.some((word: string) =>
      recipe.title.toLowerCase().includes(word),
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        loading ...
      </div>
    );
  }

  if (!loading && filteredRecipes.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <p> there is no data...</p>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-5 py-5 px-5 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((item: RecipeType, idx: number) => (
          <div
            key={idx}
            className=" shadow-md cursor-pointer rounded-lg px-4 py-3 border "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-sm text-gray-500">Type : {item.category}</p>
              </div>
              <div className="flex mt-2 items-center space-x-2">
                <Link
                  href={`/recipe/update/${item.id}`}
                  className="outline-none bg-none"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                </Link>

                <button
                  data-testid={`delete-button-${idx}`}
                  onClick={() => {
                    handleDelete(item.id as number);
                  }}
                  className="outline-none bg-none"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="mt-5 text-sm font-medium">ingredients</p>
            <div className="flex  mt-2 flex-wrap gap-x-3 gap-y-1">
              {item.ingredients?.map((ingredient: string, i: number) => (
                <p
                  key={i}
                  className="text-sm text-black px-2 py-1 bg-gray-300 rounded-full"
                >
                  {ingredient}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
