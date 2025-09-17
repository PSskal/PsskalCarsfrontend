import React, { useEffect, useRef, useState } from "react";
import CarCard from "./CarCard";

const FeacturedSectionsMobile = ({ filteredCars }) => {
  const cars = filteredCars && filteredCars.length > 0 ? filteredCars : [];
  const itemsPerPage = 6;
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const loaderRef = useRef(null);

  // Cargar más autos cuando el usuario llega al final
  useEffect(() => {
    const handleScroll = () => {
      if (
        loaderRef.current &&
        loaderRef.current.getBoundingClientRect().top <= window.innerHeight
      ) {
        setVisibleCount((prev) => Math.min(prev + itemsPerPage, cars.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cars.length]);

  // Reinicia el scroll infinito si cambia el filtro
  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [filteredCars]);

  const carsToShow = cars.slice(0, visibleCount);
  console.log("Cars to show:", carsToShow);

  return (
    <div className="flex flex-col items-center px-6 md:px-4 lg:px-10 xl:px-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {carsToShow.map((car) => (
          <div key={car.id}>
            <CarCard car={car} className="flex-1 h-full" />
          </div>
        ))}
      </div>
      {/* Loader div para detectar el scroll */}
      {visibleCount < cars.length && (
        <div ref={loaderRef} className="py-8 text-gray-400">
          Cargando más autos...
        </div>
      )}
    </div>
  );
};

export default FeacturedSectionsMobile;
