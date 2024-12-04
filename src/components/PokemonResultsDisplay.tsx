import { AllPokemonResults } from "../types/allPokemonResults";
import { ITEMS_PER_PAGE } from "../utils/consts";
import PokemonCard from "./PokemonCard";

type PokemonResultsDisplayType = {
  currentPage: number;
  results: AllPokemonResults[];
};

function PokemonResultsDisplay({
  currentPage = 1,
  results = [],
}: PokemonResultsDisplayType) {
  // Calculate the current items to display
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-[72px]">
      {currentItems.map((item) => (
        <PokemonCard pokemonResult={item} key={item.url} />
      ))}
    </div>
  );
}

export default PokemonResultsDisplay;
