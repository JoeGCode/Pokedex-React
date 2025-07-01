import { ChainLink } from "@bgoff1/pokeapi-types";

export function getEvolutionDataFromChain(chain: ChainLink) {
  const chainData = [{ name: chain.species.name, url: chain.species.url }];
  if (chain.evolves_to.length > 0) {
    chainData.push(...getEvolutionDataFromChain(chain.evolves_to[0]));
  }
  return chainData;
}
