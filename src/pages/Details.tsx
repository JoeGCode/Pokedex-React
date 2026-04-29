import PokemonDetailHero from "@/components/details/PokemonDetailHero";
import PokemonStats from "@/components/details/PokemonStats";
import PokemonVitals from "@/components/details/PokemonVitals";
import { usePokemonFullDetails } from "@/hooks/usePokemonFullDetails";

export default function Details({ pokemonName }: { pokemonName: string }) {
  const { isLoading, error, data, fullDetails } =
    usePokemonFullDetails(pokemonName);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { details: pokemon, species, evolutions } = data;

  if (fullDetails) {
    return (
      <div className="flex flex-col w-full border border-white/10 rounded-2xl">
        <PokemonDetailHero pokemonDetails={fullDetails} />
        <PokemonVitals pokemon={fullDetails} />
        <PokemonStats pokemon={fullDetails} />
      </div>
    );
  }

  return <div>Not found</div>;
  // const params = useParams("/details/:pokemon");
  // console.log(params.pokemon);
  // const { pokemonDetails, evolutionDetails, pokemonSpecies, isLoading, error } =
  //   usePokemonDetails(params.pokemon);
  // if (isLoading || error) {
  //   return isLoading ? <Loader /> : <div>{error}</div>;
  // }
  // if (!pokemonDetails || !pokemonSpecies) {
  //   return <Loader />;
  // }
  // return (
  //   <div className="flex flex-col gap-2">
  //     <div className="flex flex-col gap-2 md:flex-row">
  //       <PokemonDetailCard pokemon={pokemonDetails} />
  //       <div className="flex flex-col gap-2">
  //         <PokemonDescription species={pokemonSpecies} />
  //         <PokemonInfo pokemon={pokemonDetails} species={pokemonSpecies} />
  //       </div>
  //     </div>
  //     <div className="flex flex-col md:flex-row gap-2 items-stretch">
  //       <PokemonStatsCard pokemon={pokemonDetails} />
  //       <PokemonMoves moves={pokemonDetails.moves} />
  //     </div>
  //     {evolutionDetails && (
  //       <PokemonEvolutionChain
  //         currentPokemonName={pokemonDetails.name}
  //         evolutionList={evolutionDetails}
  //       />
  //     )}
  //   </div>
  // );
}
