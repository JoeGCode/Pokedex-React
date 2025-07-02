import { Pokemon } from "@bgoff1/pokeapi-types";
import PokemonCard from "../PokemonCard";

type Props = {
  evolutionList: Pokemon[];
  currentPokemonName: string;
};
function PokemonEvolutionChain({ evolutionList, currentPokemonName }: Props) {
  return (
    <>
      {evolutionList.length > 1 && (
        <section className="bg-secondary w-full rounded-2xl p-4 shadow-lg">
          <h1 className="text-xl text-white mb-4">Evolution Chain:</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {evolutionList.map((pokemon) => {
              return (
                <PokemonCard
                  key={pokemon.name}
                  pokemonName={pokemon.name}
                  highlighted={pokemon.name === currentPokemonName}
                  compact
                />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default PokemonEvolutionChain;
