import { NamedAPIResource } from "@bgoff1/pokeapi-types";
import { useQuery } from "crossroad";
import { useEffect, useState } from "react";
import Pagination from "../components/list/Pagination";
import PokemonResultsDisplay from "../components/list/PokemonResultsDisplay";
import SearchBar from "../components/list/SearchBar";
import useAllPokemon from "../hooks/useAllPokemon";
import { ITEMS_PER_PAGE } from "../utils/consts";

export default function PokemonList() {
  const { allPokemon, isLoading, error } = useAllPokemon();

  const [filteredPokemon, setFilteredPokemon] = useState<NamedAPIResource[]>(
    []
  );

  const [query] = useQuery();
  const pokemonQuery = query.pokemon;
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

  // Filter pokemon based on search query
  useEffect(
    function () {
      let filteredPokemon = allPokemon;

      if (pokemonQuery) {
        filteredPokemon = filteredPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(pokemonQuery.toLowerCase())
        );
      }

      setFilteredPokemon(filteredPokemon);
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
