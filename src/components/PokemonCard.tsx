import { AllPokemonResults } from "../types/allPokemonResults";
import { PokemonDetails } from "../types/pokemonDetails";
import { typeLogo } from "../utils/consts";
import Loader from "./Loader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import getPokemonCardBackground from "../utils/getPokemonCardBackground";
import { useUrl } from "crossroad";

type PokemonCardType = {
  pokemonResult: AllPokemonResults;
};

export default function PokemonCard({ pokemonResult }: PokemonCardType) {
  const { pokemon, isLoading, error } = usePokemonDetails(
    pokemonResult.name,
    false
  );

  const [, setUrl] = useUrl();

  const [, setSelectedPokemon] = useLocalStorage(
    {} as PokemonDetails,
    "selectedPokemon"
  );

  const imageURL = pokemon
    ? pokemon.sprites.front_default ??
      pokemon.sprites.other.dream_world.front_default ??
      pokemon.sprites.other.home.front_default ??
      pokemon.sprites.other["official-artwork"].front_default
    : "";

  const backgroundStyle = getPokemonCardBackground(pokemon);

  async function handleClick(pokemon: PokemonDetails) {
    await setSelectedPokemon(pokemon);
    setUrl(`/details/${pokemon.name}`);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : pokemon ? (
        <div onClick={() => handleClick(pokemon)}>
          <div
            style={backgroundStyle}
            className="flex flex-col shadow-lg items-center justify-center p-4 rounded-2xl cursor-pointer transition-transform hover:scale-105"
          >
            <h1 className="capitalize text-2xl font-bold">{pokemon.name}</h1>
            <h3 className="text-lg">{`#${pokemon.id}`}</h3>
            <div className="w-[186px]">
              <img
                className="w-full block animate-[slight-bounce_1s_ease_infinite]"
                src={imageURL}
                alt={pokemon.name}
              />
            </div>
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
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
