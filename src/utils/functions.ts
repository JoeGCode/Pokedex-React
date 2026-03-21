import { ChainLink, Pokemon, PokemonSpecies } from "@bgoff1/pokeapi-types";
import { typeColours } from "./consts";

export function normalizeString(str: string) {
  return str.trim().toLowerCase();
}

export function formatId(id: number) {
  return `#${id.toString().padStart(4, "0")}`;
}

export function getNamesFromEvolutionChain(chain: ChainLink) {
  const names: string[] = [];

  function getNameFromLink(link: ChainLink) {
    names.push(link.species.name);
    for (const evolution of link.evolves_to) {
      getNameFromLink(evolution);
    }
  }

  getNameFromLink(chain);
  return names;
}

export function cleanApiText(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\f/g, " ")
    .replace(/\cL/g, " ")
    .replace(/[\n\r\t]/g, " ")
    .replace(/\u00ad/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();
}

export function getFirstEnglishDescription(species: PokemonSpecies) {
  let englishDescription = "";
  const firstEnglishDescription = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );
  if (firstEnglishDescription) {
    englishDescription = cleanApiText(firstEnglishDescription.flavor_text);
  }
  return englishDescription;
}

export function getFirstEnglishGenus(species: PokemonSpecies) {
  let englishGenus = "";
  const englishGenera = species.genera.find(
    (gen) => gen.language.name === "en",
  );
  if (englishGenera) {
    englishGenus = cleanApiText(englishGenera.genus);
  }
  return englishGenus;
}

export default function getPokemonCardBackground(pokemon: Pokemon | undefined) {
  const gradient =
    "linear-gradient(145deg, rgba(var(--color-primary)) 5%, transparent)," +
    (pokemon && pokemon.types.length == 1
      ? `linear-gradient(to top left, ${typeColours[pokemon.types[0].type.name]}`
      : pokemon && pokemon.types.length > 1
        ? `linear-gradient(to top left, ${typeColours[pokemon.types[0].type.name]}, ${typeColours[pokemon.types[1].type.name]})`
        : "");

  return gradient;
}
