import React from "react";
import Tittle from "./Tittle";
import CarCard from "./CarCard";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import dummyCarData from "./carData";

const FeacturedSections = ({ filteredCars }) => {
  const carsToShow =
    filteredCars && filteredCars.length > 0
      ? filteredCars.slice(0, 6)
      : dummyCarData.slice(0, 6);

  return (
    <div
      className={`flex flex-col items-center px-6 md:px-4 lg:px-10 xl:px-7 `}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {carsToShow.map((car) => (
          <div key={car.id} className="">
            <CarCard car={car} className="flex-1 h-full" />
          </div>
        ))}
      </div>
      <Link href="/carros" scroll={true}>
        <button className="flex items-center justify-center gap-2 px-6 py-2 border border-black hover:bg-gray-50 rounded-md mt-18 cursor-pointer">
          Explore all Cars <FaArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default FeacturedSections;
