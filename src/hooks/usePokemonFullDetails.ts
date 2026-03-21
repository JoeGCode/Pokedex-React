import { Endpoints, Pokemon, PokemonSpecies } from "@bgoff1/pokeapi-types";
import { useEffect, useState } from "react";
import {
  fetchPokemonDetailByName,
  fetchPokemonSpeciesByName,
  fetchWithCache,
} from "../services/api";
import { getNamesFromEvolutionChain } from "../utils/functions";

type PokemonFullDetailsState = {
  isLoading: boolean;
  error: string | null;
  data: {
    details: Pokemon | null;
    species: PokemonSpecies | null;
    evolutions: Pokemon[];
  };
};

export function usePokemonFullDetails(pokemonName: string) {
  const [state, setState] = useState<PokemonFullDetailsState>({
    isLoading: false,
    error: null,
    data: {
      details: null,
      species: null,
      evolutions: [],
    },
  });

  useEffect(
    function () {
      const controller = new AbortController();
      (async () => {
        try {
          setState((prevState) => ({
            ...prevState,
            isLoading: true,
            error: null,
          }));

          const [details, species] = await Promise.all([
            fetchPokemonDetailByName(pokemonName, controller.signal),
            fetchPokemonSpeciesByName(pokemonName, controller.signal),
          ]);

          const evolutionChain = await fetchWithCache<
            Endpoints["/evolution-chain/:id"]["data"]
          >(species.evolution_chain.url, controller.signal);

          const evolutionNames = getNamesFromEvolutionChain(
            evolutionChain.chain,
          );

          const evolutionDetails = await Promise.all(
            evolutionNames.map((name) =>
              fetchPokemonDetailByName(name, controller.signal),
            ),
          );

          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            error: null,
            data: {
              details,
              species,
              evolutions: evolutionDetails,
            },
          }));
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.log("Pokemon details fetch was aborted");
            return;
          }

          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch Pokemon";

          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            error: errorMessage,
          }));
        }
      })();

      return () => {
        controller.abort();
      };
    },
    [pokemonName],
  );

  return state;
}
