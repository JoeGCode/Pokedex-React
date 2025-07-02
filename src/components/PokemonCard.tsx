import { Pokemon } from "@bgoff1/pokeapi-types";
import { useUrl } from "crossroad";
import usePokemonCardData from "../hooks/usePokemonCardData";
import { typeLogo } from "../utils/consts";
import getPokemonCardBackground from "../utils/getPokemonCardBackground";
import { getPokemonImageURL } from "../utils/getPokemonImageURL";
import Loader from "./Loader";

type PokemonCardType = {
  pokemonName: string;
  highlighted?: boolean;
  compact?: boolean;
};

export default function PokemonCard({
  pokemonName,
  highlighted = false,
  compact = false,
}: PokemonCardType) {
  const { pokemonCardData, isLoading, error } = usePokemonCardData(pokemonName);

  const [, setUrl] = useUrl();

  const imageURL = getPokemonImageURL(pokemonCardData);

  const backgroundStyle = getPokemonCardBackground(pokemonCardData);

  async function handleClick(pokemon: Pokemon) {
    setUrl(`/details/${pokemon.name}`);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : pokemonCardData ? (
        <div
          onClick={() => handleClick(pokemonCardData)}
          style={backgroundStyle}
          className={`flex flex-col shadow-lg items-center justify-center rounded-2xl cursor-pointer transition-transform hover:scale-105 ${
            highlighted ? "border-4 border-black " : ""
          } ${compact ? "p-2" : "p-4"}`}
        >
          <h1
            className={`capitalize text-center font-bold ${
              compact ? "text-lg" : "text-2xl"
            }`}
          >
            {pokemonCardData.name}
          </h1>
          <h2>{`#${pokemonCardData.id.toString().padStart(4, "0")}`}</h2>
          <div className={`${compact ? "size-24" : "size-48"}`}>
            <img
              className="w-full block animate-[slight-bounce_1s_ease_infinite]"
              src={imageURL}
              alt={pokemonCardData.name}
            />
          </div>
          <div className="flex justify-evenly w-full">
            {pokemonCardData.types.map((type, index) => {
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
      ) : (
        <Loader />
      )}
    </>
  );
}
