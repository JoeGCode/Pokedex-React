import { Pokemon } from "@bgoff1/pokeapi-types";
import { useEffect, useState } from "react";
import { getPokemonDetails } from "../utils/getPokemonDetails";

function usePokemonCardData(pokemonName: string) {
  const [pokemonCardData, setPokemonCardData] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchPokemonCardData() {
        try {
          setIsLoading(true);
          setError("");

          // Fetch pokemon details
          const data = await getPokemonDetails(pokemonName, controller);
          setPokemonCardData(data);
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.log("Pokemon card data fetch was aborted");
            return;
          }

          console.error("Error fetching Pokemon:", error);
          setError(
            error instanceof Error ? error.message : "Failed to fetch Pokemon"
          );
        } finally {
          setIsLoading(false);
        }
      }

      fetchPokemonCardData();

      return function () {
        controller.abort();
      };
    },
    [pokemonName]
  );

  return { pokemonCardData, isLoading, error };
}

export default usePokemonCardData;
