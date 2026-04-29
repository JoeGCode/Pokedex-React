import { PokemonFullDetailsData } from "@/types/custom.types";

type PokemonVitalsProps = {
  pokemon: PokemonFullDetailsData;
};
const PokemonVitals = ({ pokemon }: PokemonVitalsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 p-4 border-b border-white/10">
      <section>
        <h2 className="text-lg font-semibold mb-2">Vitals</h2>
        <div className="flex flex-row justify-between">
          {Array.from([1, 2, 3], (i) => (
            <div className="flex flex-col text-center" key={i}>
              <p className="text-xs text-secondary-text tracking-widest uppercase">
                {i === 1 ? "Height" : i === 2 ? "Weight" : "Primary Type"}
              </p>
              <p className="mt-auto">
                {i === 1 ? (
                  `${pokemon.height} m`
                ) : i === 2 ? (
                  `${pokemon.weight} kg`
                ) : (
                  <span className="capitalize">{`${pokemon.primaryType}`}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Abilities</h2>
        <ul className="space-y-2">
          {pokemon.abilities.map((ability) => (
            <li
              className="bg-white/5 rounded-xl px-4 py-2 capitalize"
              key={ability}
            >
              {ability.replace("-", " ")}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PokemonVitals;
