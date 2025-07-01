import { Endpoints, Pokemon, PokemonSpecies } from "@bgoff1/pokeapi-types";
import { useEffect, useState } from "react";
import { getEvolutionDataFromChain } from "../utils/getEvolutionDataFromChain";
import { getPokemonDetails } from "../utils/getPokemonDetails";

function usePokemonDetails(pokemonName: string) {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>();
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();
  const [evolutionDetails, setEvolutionDetails] = useState<Pokemon[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchPokemonDetails() {
        try {
          setIsLoading(true);
          setError("");

          const pokemonData = await getPokemonDetails(pokemonName, controller);
          setPokemonDetails(pokemonData);

          // Using the details, fetch species data (needed for evolution chain)
          const speciesResponse = await fetch(pokemonData.species.url, {
            signal: controller.signal,
          });

          if (!speciesResponse.ok) {
            throw new Error(
              "Something went wrong fetching this pokemon species"
            );
          }

          const speciesData: Endpoints["/pokemon-species/:id"]["data"] =
            await speciesResponse.json();

          setPokemonSpecies(speciesData);

          // If there is an evolution chain, fetch it
          if (speciesData.evolution_chain.url) {
            const evolutionResponse = await fetch(
              speciesData.evolution_chain.url,
              { signal: controller.signal }
            );

            if (!evolutionResponse.ok) {
              throw new Error(
                "Something went wrong fetching this pokemon evolution"
              );
            }

            const evolutionData: Endpoints["/evolution-chain/:id"]["data"] =
              await evolutionResponse.json();

            // Get the names in the evolution chain
            const evolutionSpecies = getEvolutionDataFromChain(
              evolutionData.chain
            );

            if (evolutionSpecies.length <= 1) return;

            // Get details for each pokemon in evolution chain
            const evolutionDetails = await Promise.all(
              evolutionSpecies.map(async (species) => {
                if (species.name.toLowerCase() === pokemonName.toLowerCase()) {
                  return pokemonData;
                } else {
                  try {
                    return await getPokemonDetails(species.name, controller);
                  } catch (error) {
                    // Some pokemon have different varieties, and their species name is not the name of an actual pokemon
                    // If this is the case, we need to fetch the default variety

                    // Do this via the species url
                    const getSpecies = await fetch(species.url, {
                      signal: controller.signal,
                    });
                    const getSpeciesData: Endpoints["/pokemon-species/:id"]["data"] =
                      await getSpecies.json();

                    // Then get the default variety
                    if (getSpeciesData.varieties.length > 0) {
                      const defaultVariety = getSpeciesData.varieties.find(
                        (variety) => variety.is_default
                      );
                      if (!defaultVariety) {
                        throw new Error(
                          "Cannot fetch data for this species: " + species.name
                        );
                      }
                      return await getPokemonDetails(
                        defaultVariety.pokemon.name,
                        controller
                      );
                    }
                    throw new Error(
                      "Cannot fetch data for this species: " + species.name
                    );
                  }
                }
              })
            );

            setEvolutionDetails(evolutionDetails);
          }
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.log("Pokemon details fetch was aborted");
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

      fetchPokemonDetails();

      return function () {
        controller.abort();
      };
    },
    [pokemonName]
  );

  return { pokemonDetails, pokemonSpecies, evolutionDetails, isLoading, error };
}

export default usePokemonDetails;
