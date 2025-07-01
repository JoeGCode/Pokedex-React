import { useQuery, useUrl } from "crossroad";

export default function SearchBar() {
  const [query, setQuery] = useQuery();
  const [, setUrl] = useUrl();
  const pokemon = query.pokemon;

  function handleSearch(value: string) {
    if (value) {
      setQuery({ pokemon: value, page: "1" });
    } else {
      setUrl("/");
    }
  }

  return (
    <div className="flex w-full mb-4">
      <input
        className="w-full rounded-md p-4"
        placeholder="Search Pokemon by name"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={pokemon}
      />
    </div>
  );
}
