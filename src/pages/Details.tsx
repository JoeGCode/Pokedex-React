import { useRoute } from "wouter";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import Loader from "../components/Loader";
import PokemonDetailCard from "../components/PokemonDetailCard";
import PokemonStatsCard from "../components/PokemonStatsCard";
import PokemonDescription from "../components/PokemonDescription";
import PokemonInfo from "../components/PokemonInfo";

export default function Details() {
  const [match, params] = useRoute("/details/:pokemon");
  const { pokemon, species, isLoading, error } = usePokemonDetails(
    match ? params.pokemon : "",
    true
  );

  if (isLoading || error) {
    return isLoading ? <Loader /> : <div>{error}</div>;
  }
  if (!pokemon || !species) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 md:flex-row">
        <PokemonDetailCard pokemon={pokemon} />
        <div className="flex flex-col gap-2">
          <PokemonDescription species={species} />
          <PokemonInfo pokemon={pokemon} species={species} />
        </div>
      </div>
      <PokemonStatsCard pokemon={pokemon} />
    </div>
  );
}
