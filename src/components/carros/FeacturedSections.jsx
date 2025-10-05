import React from "react";
import CarCard from "./CarCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Car, TestTube, DollarSign, X } from "lucide-react";

const FeacturedSections = ({
  filteredCars,
  page,
  setPage,
  // Props adicionales para mostrar información
  activeFilters = {},
  onRemoveFilter,
  priceRange = [100, 150000],
}) => {
  const cars = filteredCars && filteredCars.length > 0 ? filteredCars : [];
  const itemsPerPage = 8;
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const carsToShow = cars.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Formatear el rango de precios
  const formatPriceRange = (range) => {
    return `$${range[0].toLocaleString()} - $${range[1].toLocaleString()}`;
  };

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
      {/* Sección de información y filtros activos */}
      <div className="bg-white  pt-5 mb-6">
        {/* Fila superior: Estadísticas y badges */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {cars.length}{" "}
              {cars.length === 1 ? "Carro Encontrado" : "Carros Encontrados"}
            </span>
          </div>

          {(activeFilters?.brand ||
            activeFilters?.automatic ||
            activeFilters?.type) && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
              {/* <span className="text-sm text-gray-600 font-medium">
                Filtros activos:
              </span> */}

              {activeFilters?.brand && activeFilters.brand !== "All Brand" && (
                <Badge variant="default" className="flex items-center gap-1">
                  {activeFilters.brand}
                  {onRemoveFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => onRemoveFilter("brand")}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </Badge>
              )}

              {activeFilters?.automatic && (
                <Badge variant="default" className="flex items-center gap-1">
                  Automático
                  {onRemoveFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => onRemoveFilter("automatic")}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </Badge>
              )}

              {activeFilters?.type && activeFilters.type !== "New Car" && (
                <Badge variant="default" className="flex items-center gap-1">
                  {activeFilters.type === "Used Car"
                    ? "Usado"
                    : activeFilters.type}
                  {onRemoveFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => onRemoveFilter("type")}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fila inferior: Filtros activos (si los hay) */}

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
