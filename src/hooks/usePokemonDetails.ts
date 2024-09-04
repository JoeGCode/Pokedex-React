import { useEffect, useState } from "react";
import { PokemonDetails } from "../types/pokemonDetails";
import api from "../lib/apiUrl";
import { PokemonSpecies } from "../types/pokemonSpecies";

export function usePokemonDetails(pokemonName: string, getSpecies: boolean) {
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [species, setSpecies] = useState<PokemonSpecies>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchPokemon() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(api.requestPokemon + pokemonName, {
            signal: controller.signal,
          });
          if (!res.ok) {
            throw new Error("Something went wrong fetching this pokemon");
          }
          const data: PokemonDetails = await res.json();
          setPokemon(data);
          if (getSpecies) {
            const speciesURL = data.species.url;
            const speciesRes = await fetch(speciesURL, {
              signal: controller.signal,
            });
            if (!speciesRes.ok) {
              throw new Error(
                "Something went wrong fetching the Pokemon species"
              );
            }
            const speciesData: PokemonSpecies = await speciesRes.json();
            setSpecies(speciesData);
          }
        } catch (error) {
          if (typeof error === "string") {
            setError(error.toUpperCase());
            console.error(error.toUpperCase());
          } else if (error instanceof Error) {
            if (error.name !== "AbortError") {
              setError(error.message);
              console.error(error.message);
            }
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchPokemon();

      return function () {
        controller.abort();
      };
    },
    [getSpecies, pokemonName]
  );

  return { pokemon, species, isLoading, error };
}
