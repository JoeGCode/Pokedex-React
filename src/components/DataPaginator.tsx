import { useState, useEffect } from "react";
import { AllPokemonResults } from "../types/allPokemonResults";
import PokemonCard from "./PokemonCard";
import Button from "./Button";

function DataPaginator({ data }: { data: AllPokemonResults[] }) {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Go back to first page if data changes
  useEffect(
    function () {
      setCurrentPage(1);
    },
    [data]
  );

  // Function to handle pagination
  // function handlePageChange(pageNumber: number) {
  //   setCurrentPage(pageNumber);
  // }

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to go to first page
  function handleFirstPage() {
    setCurrentPage(1);
  }

  // Function to go to last page
  function handleLastPage() {
    setCurrentPage(pageNumbers.length);
  }

  // Function to go to next page
  function handleNextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  // Function to go to previous page
  function handlePreviousPage() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  // Only show first and last page buttons if the user is not on the first or last page
  const notOnFirstPage = currentPage !== 1;
  const notOnLastPage = currentPage !== pageNumbers.length;

  return (
    <div>
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-[88px]">
        {currentItems.map((item) => (
          <PokemonCard pokemonResult={item} key={item.url} />
        ))}
      </div>
      <div className="w-full grid grid-flow-col px-8 py-4 gap-8 fixed bottom-0 left-0 right-0 bg-primary bg-opacity-80 backdrop-blur">
        {notOnFirstPage && (
          <>
            <Button onClick={handleFirstPage}>First Page</Button>
            <Button onClick={handlePreviousPage}>Previous Page</Button>
          </>
        )}
        {notOnLastPage && (
          <>
            <Button onClick={handleNextPage}>Next Page</Button>
            <Button onClick={handleLastPage}>Last Page</Button>
          </>
        )}
      </div>
    </div>
  );
}
export default DataPaginator;
