import React from "react";
import CarCard from "./CarCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const FeacturedSections = ({ filteredCars, page, setPage }) => {
  const cars = filteredCars && filteredCars.length > 0 ? filteredCars : [];
  const itemsPerPage = 8;
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const carsToShow = cars.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Genera los links de paginación
  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={(event) => {
              event.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return links;
  };

  return (
    <div className="flex flex-col px-6 md:px-4 lg:px-10 xl:px-7">
      <div className="grid w-full grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {carsToShow.map((car) => (
          <div key={car.id}>
            <CarCard
              car={car}
              className="flex-1 h-full"
              disableNavigation={car.status !== "disponible"}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-8 text-black">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (page > 1) handlePageChange(page - 1);
                }}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            {renderPaginationLinks()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (page < totalPages) handlePageChange(page + 1);
                }}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FeacturedSections;