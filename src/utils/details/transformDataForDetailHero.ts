import getPokemonCardBackground, {
  formatId,
  getFirstEnglishDescription,
  getFirstEnglishGenus,
} from "@/utils/functions";
import { getPokemonImageURL } from "@/utils/getPokemonImageURL";
import { Pokemon, PokemonSpecies } from "@bgoff1/pokeapi-types";

export default function transformDataForDetailHero(
  pokemon: Pokemon,
  species: PokemonSpecies,
) {
  const genus = getFirstEnglishGenus(species);
  const description = getFirstEnglishDescription(species);
  const formattedId = formatId(pokemon.id);
  const imageUrl = getPokemonImageURL(pokemon);
  const backgroundStyle = getPokemonCardBackground(pokemon);

  return {
    genus,
    description,
    formattedId,
    imageUrl,
    backgroundStyle,
    pokemon,
  };
}
