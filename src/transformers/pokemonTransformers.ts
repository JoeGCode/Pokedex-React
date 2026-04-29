import { PokemonCardData, PokemonFullDetailsData } from "@/types/custom.types";
import {
  formatId,
  getFirstEnglishDescription,
  getFirstEnglishGenus,
  getPokemonCardBackground,
  getPokemonCardImageURL,
} from "@/utils/functions";
import { typeColours } from "@/utils/typeColours";
import { Pokemon, PokemonSpecies } from "@bgoff1/pokeapi-types";

export function transformToPokemonCardData(pokemon: Pokemon): PokemonCardData {
  const formattedId = formatId(pokemon.id);
  const imageUrl = getPokemonCardImageURL(pokemon.sprites);
  const backgroundStyle = getPokemonCardBackground(pokemon);

  const primaryType = pokemon.types[0].type.name;
  const primaryTypeColour = typeColours[primaryType];

  const types = pokemon.types.map((type) => type.type.name);

  return {
    name: pokemon.name,
    formattedId,
    imageUrl,
    backgroundStyle,
    primaryTypeColour,
    types,
  };
}

export function transformToPokemonFullDetails(
  pokemon: Pokemon,
  species: PokemonSpecies,
): PokemonFullDetailsData {
  const formattedId = formatId(pokemon.id);
  const imageUrl = getPokemonCardImageURL(pokemon.sprites);
  const backgroundStyle = getPokemonCardBackground(pokemon);
  const types = pokemon.types.map((type) => type.type.name);
  const description = getFirstEnglishDescription(species);
  const genus = getFirstEnglishGenus(species);
  const primaryType = pokemon.types[0]?.type?.name ?? "";

  const weight = pokemon.weight / 10; // Convert to kg
  const height = pokemon.height / 10; // Convert to m

  const abilities = pokemon.abilities.map((ability) => ability.ability.name);

  const stats = pokemon.stats.map((stat) => ({
    label: stat.stat.name,
    value: stat.base_stat,
  }));

  const primaryTypeColourHex = typeColours[primaryType];

  return {
    name: pokemon.name,
    formattedId,
    imageUrl,
    backgroundStyle,
    types,
    description,
    genus,
    weight,
    height,
    primaryType,
    abilities,
    stats,
    primaryTypeColourHex,
  };
}
