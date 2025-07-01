import { Endpoints } from "@bgoff1/pokeapi-types";
import api from "../lib/apiUrl";

export async function getPokemonDetails(
  pokemonName: string,
  controller?: AbortController
) {
  const res = await fetch(api.requestPokemon + pokemonName.toLowerCase(), {
    signal: controller?.signal,
  });
  if (!res.ok) {
    throw new Error("Something went wrong fetching this pokemon");
  }
  const data: Endpoints["/pokemon/:id"]["data"] = await res.json();
  return data;
}
