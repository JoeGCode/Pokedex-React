import { PokemonFullDetailsData } from "@/types/custom.types";

type PokemonVitalsProps = {
  pokemon: PokemonFullDetailsData;
};
const PokemonVitals = ({ pokemon }: PokemonVitalsProps) => {
  return (
    <section className="p-4">
      <div className="grid grid-cols-3">
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
  );
};

export default PokemonVitals;
