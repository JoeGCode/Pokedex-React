import { PokemonFullDetailsData } from "@/types/custom.types";

type PokemonVitalsProps = {
  pokemon: PokemonFullDetailsData;
};
const PokemonVitals = ({ pokemon }: PokemonVitalsProps) => {
  return <section className="p-4">{pokemon.weight}</section>;
};

export default PokemonVitals;
