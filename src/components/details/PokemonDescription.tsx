import { PokemonSpecies } from "@bgoff1/pokeapi-types";

type PokemonDescriptionType = {
  species?: PokemonSpecies;
};

export default function PokemonDescription({
  species,
}: PokemonDescriptionType) {
  return (
    <section className="bg-secondary shadow-lg rounded-2xl text-white p-4 w-full h-full">
      <h1 className="text-2xl">Description:</h1>
      <div className="text-xl">
        {
          species?.flavor_text_entries
            .filter((entry) => entry.language.name === "en")
            .shift()?.flavor_text
        }
      </div>
    </section>
  );
}
