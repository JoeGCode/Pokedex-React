import { fetchPokemonPage } from "@/api/pokeApi";
import { transformToPokemonCardData } from "@/transformers/pokemonTransformers";
import { PokemonCardData } from "@/types/custom.types";
import { useEffect, useState } from "react";

type UsePokemonPageState = {
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  results: PokemonCardData[];
};
export function usePokemonPage() {
  const [state, setState] = useState<UsePokemonPageState>({
    isLoading: false,
    error: "",
    totalResults: 0,
    results: [],
  });

  useEffect(function () {
    const controller = new AbortController();
    (async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
        }));

        const data = await fetchPokemonPage(1, controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        const transformedResults = data.results.map((pokemon) =>
          transformToPokemonCardData(pokemon),
        );

        setState({
          isLoading: false,
          error: null,
          totalResults: data.total,
          results: transformedResults,
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Pokemon list fetch was aborted");
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
  }, []);

  return state;
}

export default usePokemonPage;
