import { PokemonFullDetailsData } from "@/types/custom.types";
import PokemonStatBar from "./PokemonStatBar";

type PokemonStatsProps = {
  pokemon: PokemonFullDetailsData;
};
const PokemonStats = ({ pokemon }: PokemonStatsProps) => {
  return (
    <section className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Base Stats</h2>
      <div className="space-y-2">
        {pokemon.stats.map((stat) => (
          <PokemonStatBar
            key={stat.label}
            stat={stat}
            primaryColourHex={pokemon.primaryTypeColourHex}
          />
        ))}
      </div>
    </section>
  );
};

export default PokemonStats;
