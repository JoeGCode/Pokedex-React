import { PokemonDetails } from "../types/pokemonDetails";
import { PokemonSpecies } from "../types/pokemonSpecies";

type PokemonInfoType = {
  pokemon: PokemonDetails;
  species: PokemonSpecies;
};

function PokemonInfo({ pokemon, species }: PokemonInfoType) {
  return (
    <section className="bg-secondary shadow-lg rounded-2xl text-white p-4 w-full h-full">
      <h1 className="text-xl">Info:</h1>
      <h2>Height: {pokemon.height / 10} kg</h2>
      <h2>Weight: {pokemon.weight / 10}m</h2>
      <h2>
        Type:{" "}
        {
          species.genera
            .filter((genera) => genera.language.name === "en")
            .shift()?.genus
        }
      </h2>
    </section>
  );
}

export default PokemonInfo;
