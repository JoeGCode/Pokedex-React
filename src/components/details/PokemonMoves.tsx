import { PokemonMove } from "@bgoff1/pokeapi-types";

type Props = {
  moves: PokemonMove[];
};

function PokemonMoves({ moves }: Props) {
  return (
    <section className="bg-secondary shadow-lg rounded-2xl text-white text-xl p-4 w-full flex flex-col">
      <h1>Moves:</h1>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-grow max-h-80">
        {moves.map((move) => (
          <span
            key={move.move.name}
            className="bg-white/10 rounded-lg p-2 text-sm capitalize"
          >
            {move.move.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export default PokemonMoves;
