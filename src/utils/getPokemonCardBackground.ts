import { Pokemon } from "@bgoff1/pokeapi-types";
import { CSSProperties } from "react";
import { typeColours } from "./consts";

export default function getPokemonCardBackground(pokemon: Pokemon | undefined) {
  const backgroundStyle: CSSProperties =
    pokemon && pokemon.types.length == 1
      ? { backgroundColor: typeColours[pokemon.types[0].type.name] }
      : pokemon && pokemon.types.length > 1
      ? {
          backgroundImage: `linear-gradient(to top left, ${
            typeColours[pokemon.types[1].type.name]
          }, 35%, ${typeColours[pokemon.types[0].type.name]})`,
        }
      : {};

  return backgroundStyle;
}
