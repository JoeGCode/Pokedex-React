import Loader from "@/components/Loader";
import TypeBadge from "@/components/TypeBadge";
import { PokemonCardData } from "@/types/custom.types";
import { useUrl } from "crossroad";

type PokemonCardType = {
  pokemon: PokemonCardData;
};

export default function PokemonCard({ pokemon }: PokemonCardType) {
  const [, setUrl] = useUrl();

  async function handleClick(pokemon: PokemonCardData) {
    setUrl(`/details/${pokemon.name}`);
  }

  return (
    <>
      {pokemon ? (
        <div
          onClick={() => handleClick(pokemon)}
          // style={backgroundStyle}
          className="relative flex flex-col shadow-lg rounded-3xl cursor-pointer transition-transform hover:-translate-y-1 duration-300 group hover:border-current hover:shadow-2xl hover:shadow-current"
          style={{
            color: pokemon.primaryTypeColour,
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              backgroundImage: `${pokemon.backgroundStyle}`,
            }}
          />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex w-full items-start justify-start text-sm text-secondary-text">
              <span>{pokemon.formattedId}</span>
            </div>
            <div className="mt-6">
              <h3 className="capitalize text-2xl text-white font-semibold">
                {pokemon.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {pokemon.types.map((type, index) => {
                  return (
                    <div key={index} className="w-1/3 max-w-[150px]">
                      <TypeBadge type={type} />
                    </div>
                  );
                  // return (
                  //   <img
                  //     src={typeLogo[type.type.name]}
                  //     alt={type.type.name}
                  //     className="w-1/3 max-w-[150px]"
                  //     key={index}
                  //   />
                  // );
                })}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                loading="lazy"
                className="h-36 w-36 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          {/* <h1
            className={`capitalize text-center font-bold ${
              compact ? "text-lg" : "text-2xl"
            }`}
          >
            {pokemon.name}
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
          </div> */}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
