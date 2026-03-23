import { ITEMS_PER_PAGE } from "@/constants/layout";
import { AllPokemonCall } from "@/types/api.types.ts";
import { normalizeString } from "@/utils/functions";
import { Endpoints, Pokemon } from "@bgoff1/pokeapi-types";

export const API_BASE_URL = "https://pokeapi.co/api/v2";

const cache = new Map<string, unknown>();

export async function fetchWithCache<T>(url: string, signal?: AbortSignal) {
  const cached = cache.get(url);
  if (cached) {
    return cached as T;
  }
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} fetching ${url}. Status: ${res.statusText}`,
    );
  }
  const data: T = await res.json();
  cache.set(url, data);
  return data;
}

export async function fetchPokemonPage(page: number, signal?: AbortSignal) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  // const response = await fetch(
  //   `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
  //   { signal },
  // );

  // if (!response.ok) {
  //   throw new Error("Failed to load Pokemon roster");
  // }

  // const data: AllPokemonCall = await response.json();
  const data = await fetchWithCache<AllPokemonCall>(
    `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
    signal,
  );

  const results = await Promise.all(
    data.results.map(async (pokemon) => {
      return await fetchPokemonDetailByName(pokemon.name, signal);
    }),
  );

  return { total: data.count, results };
}

export async function fetchPokemonDetailByName(
  name: string,
  signal?: AbortSignal,
) {
  const normalizedName = normalizeString(name);
  // const cached = pokemonDetailCache.get(normalizedName);
  // if (cached) {
  //   return cached;
  // }

  // const response = await fetch(`${API_BASE_URL}/pokemon/${normalizedName}`, {
  //   signal,
  // });

  // if (!response.ok) {
  //   if (response.status === 404) {
  //     throw new Error("Pokemon not found");
  //   }
  //   throw new Error("Failed to load Pokemon details");
  // }

  // const data: Pokemon = await response.json();

  const data = await fetchWithCache<Pokemon>(
    `${API_BASE_URL}/pokemon/${normalizedName}`,
    signal,
  );
  return data;
}

export async function fetchPokemonSpeciesByName(
  name: string,
  signal?: AbortSignal,
) {
  const normalizedName = normalizeString(name);
  const data = await fetchWithCache<Endpoints["/pokemon-species/:id"]["data"]>(
    `${API_BASE_URL}/pokemon-species/${normalizedName}`,
    signal,
  );
  return data;
}
