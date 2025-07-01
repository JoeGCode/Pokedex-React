import { Pokemon } from "@bgoff1/pokeapi-types";
import PokemonStatBar from "./PokemonStatBar";

type PokemonStatsCardType = {
  pokemon: Pokemon;
};

export default function PokemonStatsCard({ pokemon }: PokemonStatsCardType) {
  return (
    <section className="bg-secondary text-white w-full rounded-2xl p-4 shadow-lg">
      <h1 className="text-xl">Stats:</h1>
      <div className="grid grid-flow-col auto-cols-fr gap-1 md:gap-4">
        {pokemon.stats.map((stat) => (
          <PokemonStatBar
            key={stat.stat.name}
            value={stat.base_stat}
            label={stat.stat.name.replace("-", " ")}
            mainType={pokemon.types[0].type.name}
          />
        ))}
      </div>
    </section>
  );
}
