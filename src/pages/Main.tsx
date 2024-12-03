import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import api from "../lib/apiUrl";
import { AllPokemonResults } from "../types/allPokemonResults";
import { useQuery } from "crossroad";
import PokemonResultsDisplay from "../components/PokemonResultsDisplay";
import Pagination from "../components/Pagination";
import { ITEMS_PER_PAGE } from "../utils/consts";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<AllPokemonResults[]>(
    []
  );
  const [allPokemon, setAllPokemon] = useState<AllPokemonResults[]>([]);
  const [query] = useQuery();
  const pokemonQuery = query.pokemon;
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

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
        const data: { count: number; results: AllPokemonResults[] } =
          await res.json();
        setAllPokemon(data.results);
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

    fetchAllPokemon();

    return function () {
      controller.abort();
    };
  }, []);

  useEffect(
    function () {
      if (pokemonQuery) {
        const filteredPokemon = allPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(pokemonQuery.toLowerCase())
        );
        setFilteredPokemon(filteredPokemon);
      } else {
        setFilteredPokemon(allPokemon);
      }
    },
    [pokemonQuery, allPokemon]
  );
  return (
    <>
      <SearchBar />
      {isLoading ? (
        "LOADING..."
      ) : error ? (
        <div>{error}</div>
      ) : (
        // <DataPaginator data={filteredPokemon} />
        <>
          <PokemonResultsDisplay
            results={filteredPokemon}
            currentPage={currentPage}
          />
          <Pagination totalPages={totalPages} />
        </>
      )}
    </>
  );
}
