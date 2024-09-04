import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useLocation, useRoute } from "wouter";
import api from "../lib/apiUrl";
import { AllPokemonResults } from "../types/allPokemonResults";
import DataPaginator from "../components/DataPaginator";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<AllPokemonResults[]>(
    []
  );
  const [allPokemon, setAllPokemon] = useState<AllPokemonResults[]>([]);
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/:pokemon");

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
      if (match) {
        const filteredPokemon = allPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(params.pokemon.toLowerCase())
        );
        setFilteredPokemon(filteredPokemon);
      } else {
        setFilteredPokemon(allPokemon);
      }
    },
    [allPokemon, match, params?.pokemon]
  );

  function searchHandler(query: string) {
    setLocation(`/${query}`);
  }
  return (
    <>
      <SearchBar searchHandler={searchHandler} />
      {isLoading ? (
        "LOADING..."
      ) : error ? (
        <div>{error}</div>
      ) : (
        <DataPaginator data={filteredPokemon} />
      )}
    </>
  );
}
