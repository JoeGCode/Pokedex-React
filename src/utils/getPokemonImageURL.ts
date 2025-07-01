import { Pokemon } from "@bgoff1/pokeapi-types";

type FullPokemonSprites = Pokemon["sprites"] & {
  other?: {
    dream_world?: {
      front_default: string | null;
    };
    home?: {
      front_default: string | null;
    };
    "official-artwork"?: {
      front_default: string | null;
    };
  };
};

export function getPokemonImageURL(pokemon: Pokemon | undefined) {
  if (!pokemon) return "";

  const sprites: FullPokemonSprites = pokemon.sprites;

  const imageURL =
    sprites.front_default ??
    sprites.other?.dream_world?.front_default ??
    sprites.other?.home?.front_default ??
    sprites.other?.["official-artwork"]?.front_default ??
    "";

  return imageURL;
}

export function getPokemonDetailImageURL(pokemon: Pokemon | undefined) {
  if (!pokemon) return "";

  const sprites: FullPokemonSprites = pokemon.sprites;

  const imageURL =
    sprites.other?.home?.front_default ??
    sprites.other?.dream_world?.front_default ??
    sprites.other?.["official-artwork"]?.front_default ??
    sprites.front_default ??
    "";

  return imageURL;
}
