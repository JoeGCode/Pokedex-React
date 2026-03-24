import { PokemonFullDetailsData } from "@/types/custom.types";

type PokemonVitalsProps = {
  pokemon: PokemonFullDetailsData;
};
const PokemonVitals = ({ pokemon }: PokemonVitalsProps) => {
  return (
    <section className="p-4">
      <div className="grid grid-cols-3">
        {Array.from([1, 2, 3], (i) => (
          <div key={i}>
            <span className="text-xs text-secondary-text tracking-widest uppercase">
              {i === 1 ? "Height" : i === 2 ? "Weight" : "Primary Type"}
            </span>
            <p>
              {i === 1
                ? `${pokemon.height} m`
                : i === 2
                  ? `${pokemon.weight} kg`
                  : pokemon.primaryType}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PokemonVitals;
