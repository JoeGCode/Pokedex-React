import { useState } from "react";

type SearchBarProps = {
  searchHandler: (query: string) => void;
};

export default function SearchBar({ searchHandler }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSearch(query: string) {
    setQuery(query);
    searchHandler(query);
  }

  return (
    <div className="flex w-full mb-4">
      <input
        className="w-full rounded-md p-4"
        placeholder="Search Pokemon by name"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
