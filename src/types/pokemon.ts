import { Endpoints } from "@bgoff1/pokeapi-types";

export type AllPokemonCall = Endpoints["/pokemon"]["data"];
export type AllPokemonResults = AllPokemonCall["results"];
