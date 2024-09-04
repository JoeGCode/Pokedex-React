import { PokemonSpecies } from "../types/pokemonSpecies";

type PokemonDescriptionType = {
  species: PokemonSpecies;
};

export default function PokemonDescription({
  species,
}: PokemonDescriptionType) {
  return (
    <section className="bg-secondary shadow-lg rounded-2xl text-white p-4 w-full h-full">
      <h1 className="text-xl">Description:</h1>
      {
        species.flavor_text_entries
          .filter((entry) => entry.language.name === "en")
          .shift()?.flavor_text
      }
    </section>
  );
}
