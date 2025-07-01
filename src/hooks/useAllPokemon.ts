import { useEffect, useState } from "react";
import api from "../lib/apiUrl";

import { Endpoints, NamedAPIResource } from "@bgoff1/pokeapi-types";

export function useAllPokemon() {
  const [allPokemon, setAllPokemon] = useState<NamedAPIResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    const controller = new AbortController();
    async function fetchAllPokemon() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(api.requestAllPokemon, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Something went wrong fetch all pokemon");
        }

        const data: Endpoints["/pokemon"]["data"] = await res.json();
        setAllPokemon(data.results);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Pokemon list fetch was aborted");
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

    fetchAllPokemon();

    return function () {
      controller.abort();
    };
  }, []);

  return { allPokemon, isLoading, error };
}

export default useAllPokemon;
