import { PokemonDetails } from "../types/pokemonDetails";
import getPokemonCardBackground from "../utils/getPokemonCardBackground";
import { typeLogo } from "../utils/helpers";

type PokemonDetailCardType = {
  pokemon: PokemonDetails;
};

export default function PokemonDetailCard({ pokemon }: PokemonDetailCardType) {
  const backgroundStyle = getPokemonCardBackground(pokemon);

  const imageURL =
    pokemon.sprites.other.home.front_default ??
    pokemon.sprites.other.dream_world.front_default ??
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default ??
    "";

  return (
    <section
      style={backgroundStyle}
      className="w-full p-4 shadow-lg rounded-2xl flex flex-col items-center"
    >
      <h1 className="text-xl capitalize">{pokemon.name}</h1>
      <h2>{`#${pokemon.id.toString().padStart(4, "0")}`}</h2>
      <img
        className="w-full max-w-[50%] block animate-[slight-bounce_2s_ease_infinite]"
        src={imageURL}
        alt={pokemon.name}
      />
      <div className="flex justify-evenly w-full">
        {pokemon.types.map((type, index) => {
          return (
            <img
              src={typeLogo[type.type.name]}
              alt={type.type.name}
              className="w-1/3 max-w-[150px]"
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
}
