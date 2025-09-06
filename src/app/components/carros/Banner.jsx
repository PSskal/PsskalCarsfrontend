"use client";
import React, { useState } from "react";
import {
  FaRedo,
  FaCarSide,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import brands from "./carBrands";

export default function Banner({ cars = [] }) {
  const [automatic, setAutomatic] = useState(false);
  const [carType, setCarType] = useState("New Car");
  const [selectedBrands, setSelectedBrands] = useState(["All Brand"]);
  const [priceRange, setPriceRange] = useState([50000, 500000]);
  const [activeFilters, setActiveFilters] = useState([]);

  // Simple filter logic (for demo)
  const filteredCars = cars.filter((car) => {
    if (carType === "New Car" && car.isUsed) return false;
    if (carType === "Used Car" && !car.isUsed) return false;
    if (
      selectedBrands[0] !== "All Brand" &&
      !selectedBrands.includes(car.brand)
    )
      return false;
    if (car.price < priceRange[0] || car.price > priceRange[1]) return false;
    return true;
  });

  function toggleBrand(brand) {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([
        ...selectedBrands.filter((b) => b !== "All Brand"),
        brand,
      ]);
    }
    if (brand === "All Brand") setSelectedBrands(["All Brand"]);
  }

  function resetFilters() {
    setAutomatic(false);
    setCarType("New Car");
    setSelectedBrands(["All Brand"]);
    setPriceRange([50000, 500000]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Sidebar Filters */}
      <div className="w-64  md:w-70  lg:w-90flex-shrink-0 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Filter</h3>
          <button
            onClick={resetFilters}
            className="text-blue-600 flex items-center gap-1 text-sm"
          >
            <FaRedo /> Reset
          </button>
        </div>
        {/* Free Test Drive */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-6 h-6 text-gray-400" />
              <span className="text-sm">Automatico</span>
            </div>
            <input
              type="checkbox"
              checked={automatic}
              onChange={(e) => setAutomatic(e.target.checked)}
            />
          </div>
        </div>
        {/* Type of Car */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Type of Car</h4>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${
                carType === "New Car"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setCarType("New Car")}
            >
              New Car
            </button>
            <button
              className={`px-3 py-1 rounded ${
                carType === "Used Car"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setCarType("Used Car")}
            >
              Used Car
            </button>
          </div>
        </div>
        {/* Brand */}
        <div className="mb-6">
          <h4 className="mb-3 font-bold">Marcas</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-bold">Todas las marcas</span>
              </div>
              <input
                type="checkbox"
                checked={selectedBrands.includes("All Brand")}
                onChange={() => toggleBrand("All Brand")}
                className="rounded"
              />
            </div>
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center gap-2 flex-1">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-sm font-bold">{brand.name}</span>
                </div>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => toggleBrand(brand.name)}
                  className="rounded-3xl font-bold"
                />
              </div>
            ))}
          </div>
          <button className="text-blue-600 mt-2 text-sm">More Brand</button>
        </div>
        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="flex items-center gap-2 mb-4">
            <FaMoneyBillWave className="text-gray-400" />
            <input
              type="number"
              min={50000}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-20 px-2 py-1 border rounded"
            />
            <span>—</span>
            <input
              type="number"
              min={priceRange[0]}
              max={500000}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>—</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          {/* <h2 className="text-xl font-semibold">
            {filteredCars.length} Car Foundedss
          </h2> */}
          {/* Active Filters */}
          <div className="flex items-center gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded text-xs"
              >
                {filter}
                <button className="ml-1 text-xs">×</button>
              </span>
            ))}
          </div>
        </div>
        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <FaCarSide className="text-4xl text-blue-600 mb-2" />
              <div className="font-bold">
                {car.brand} {car.model}
              </div>
              <div className="text-sm text-gray-500">
                ${car.price.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">
                {car.isUsed ? "Used" : "New"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
