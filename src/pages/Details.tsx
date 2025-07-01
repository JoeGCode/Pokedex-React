import { useParams } from "crossroad";
import Loader from "../components/Loader";
import PokemonDescription from "../components/details/PokemonDescription";
import PokemonDetailCard from "../components/details/PokemonDetailCard";
import PokemonEvolutionChain from "../components/details/PokemonEvolutionChain";
import PokemonInfo from "../components/details/PokemonInfo";
import PokemonMoves from "../components/details/PokemonMoves";
import PokemonStatsCard from "../components/details/PokemonStatsCard";
import usePokemonDetails from "../hooks/usePokemonDetails";

export default function Details() {
  const params = useParams("/details/:pokemon");
  console.log(params.pokemon);
  const { pokemonDetails, evolutionDetails, pokemonSpecies, isLoading, error } =
    usePokemonDetails(params.pokemon);

  if (isLoading || error) {
    return isLoading ? <Loader /> : <div>{error}</div>;
  }
  if (!pokemonDetails || !pokemonSpecies) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 md:flex-row">
        <PokemonDetailCard pokemon={pokemonDetails} />
        <div className="flex flex-col gap-2">
          <PokemonDescription species={pokemonSpecies} />
          <PokemonInfo pokemon={pokemonDetails} species={pokemonSpecies} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        <PokemonStatsCard pokemon={pokemonDetails} />
        <PokemonMoves moves={pokemonDetails.moves} />
      </div>
      {evolutionDetails && (
        <PokemonEvolutionChain
          currentPokemonName={pokemonDetails.name}
          evolutionList={evolutionDetails}
        />
      )}
    </div>
  );
}
