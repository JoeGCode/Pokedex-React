import PokemonCard from "@/components/PokemonCard";
import usePokemonPage from "@/hooks/usePokemonPage";

const HomePage = () => {
  const { isLoading, error, totalResults, results } = usePokemonPage();
  return (
    <div className="space-y-8">
      <section>SEARCH BAR AND OTHER INFO</section>
      <section>
        {error ? (
          <p>{error}</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No results</p>
        ) : (
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((item) => (
              <PokemonCard pokemon={item} key={item.name} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
