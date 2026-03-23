import TypeBadge from "@/components/TypeBadge";
import { PokemonFullDetailsData } from "@/types/custom.types";

type PokemonDetailHeroProps = {
  pokemonDetails: PokemonFullDetailsData;
};

const PokemonDetailHero = ({ pokemonDetails }: PokemonDetailHeroProps) => {
  return (
    <section
      className="p-4 rounded-t-2xl"
      style={{ backgroundImage: `${pokemonDetails.backgroundStyle}` }}
    >
      <div className="relative flex h-full flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <div className="space-y-4 md:flex-1">
          <span className="rounded-full bg-white/10 px-4 py-1 spacing tracking-[0.2em]">
            {pokemonDetails.formattedId}
          </span>
          <h2 className="capitalize text-4xl font-medium text-center">
            {pokemonDetails.name}
          </h2>
          <h3 className="uppercase text-xl text-secondary-text font-extralight text-center">
            {pokemonDetails.genus}
          </h3>
          <div className="w-full flex flex-wrap items-center justify-center gap-2">
            {pokemonDetails.types.map((type) => {
              return (
                <div key={type} className="w-1/3 max-w-[150px]">
                  <TypeBadge type={type} />
                </div>
              );
            })}
          </div>
          <p className="text-secondary-text text-center">
            {pokemonDetails.description}
          </p>
        </div>
        <div className="flex items-center justify-center md:flex-1 md:justify-end">
          <img
            src={pokemonDetails.imageUrl}
            alt={pokemonDetails.name}
            loading="lazy"
            className="w-full max-w-56 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default PokemonDetailHero;
