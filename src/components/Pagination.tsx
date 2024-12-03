import { useQuery } from "crossroad";
import React from "react";

type PaginationType = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationType) {
  const [page, setPage] = useQuery("page");
  const currentPage = Number(page) || 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-secondary text-white p-2">
      <div className="w-full mx-auto max-w-screen-xl grid grid-cols-5 gap-2">
        <PaginationButton
          text="<<"
          onClick={() => setPage("1")}
          isDisabled={currentPage === 1}
        />
        <PaginationButton
          text="<"
          onClick={() => setPage(String(currentPage - 1))}
          isDisabled={currentPage === 1}
        />
        <span className="flex justify-center items-center">
          {currentPage} / {totalPages}
        </span>
        <PaginationButton
          text=">"
          onClick={() => setPage(String(currentPage + 1))}
          isDisabled={currentPage === totalPages}
        />
        <PaginationButton
          text=">>"
          onClick={() => setPage(totalPages.toString())}
          isDisabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}

function PaginationButton({
  text,
  onClick,
  isDisabled,
}: {
  text: string;
  onClick: () => void;
  isDisabled: boolean;
}) {
  return (
    <button
      className="bg-primary text-white p-4 rounded-md"
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
