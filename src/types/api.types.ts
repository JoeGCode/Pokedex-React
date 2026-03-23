import { Endpoints, Pokemon } from "@bgoff1/pokeapi-types";

export type AllPokemonCall = Endpoints["/pokemon"]["data"];
export type AllPokemonResults = AllPokemonCall["results"];

export type FullPokemonSprites = Pokemon["sprites"] & {
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
