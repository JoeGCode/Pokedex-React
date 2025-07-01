import { Pokemon, PokemonSpecies } from "@bgoff1/pokeapi-types";

type PokemonInfoType = {
  pokemon: Pokemon;
  species?: PokemonSpecies;
};

function PokemonInfo({ pokemon, species }: PokemonInfoType) {
  return (
    <section className="bg-secondary shadow-lg rounded-2xl text-white text-xl p-4 w-full h-full">
      <h1 className="text-2xl">Info:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PokemonInfoColumn label="Height:" value={`${pokemon.height / 10} m`} />
        <PokemonInfoColumn
          label="Weight:"
          value={`${pokemon.weight / 10} kg`}
        />
        <PokemonInfoColumn
          label="Type:"
          value={
            species?.genera
              .filter((genera) => genera.language.name === "en")
              .shift()?.genus ?? "Pokemon"
          }
        />
        <PokemonInfoColumn
          label="Abilities:"
          value={
            <div className="flex flex-col gap-1">
              {pokemon.abilities.map((ability) => {
                return (
                  <span key={ability.ability.name} className="capitalize ">
                    {ability.ability.name}
                  </span>
                );
              })}
            </div>
          }
        />
      </div>
    </section>
  );
}

function PokemonInfoColumn({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-start gap-1 bg-white/20 p-2 rounded-lg">
      <div className="text-base">{label}</div>
      <div>{value}</div>
    </div>
  );
}
export default PokemonInfo;
