"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  FaRedo,
  FaCarSide,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import brands from "./carBrands";

export default function Banner({
  carType,
  setCarType,
  selectedBrands = ["All Brand"], // <--- valor por defecto
  setSelectedBrands,
  priceRange,
  setPriceRange,
  isAutomatic,
  setIsAutomatic,
  toggleBrand,
}) {
  function resetFilters() {
    setIsAutomatic(false);
    setCarType("New Car");
    setSelectedBrands(["All Brand"]);
    setPriceRange([100, 150000]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Sidebar Filters */}
      <div className="w-64  md:w-70  lg:w-90flex-shrink-0 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Filter</h3>
          <button
            onClick={resetFilters}
            className="text-blue-600 flex items-center gap-1 text-sm cursor-pointer"
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
              checked={isAutomatic}
              className="rounded cursor-pointer"
              onChange={(e) => setIsAutomatic(e.target.checked)}
            />
          </div>
        </div>
        {/* Type of Car */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Type of Car</h4>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded cursor-pointer ${
                carType === "New Car"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setCarType("New Car")}
            >
              Carro Nuevo
            </button>
            <button
              className={`px-3 py-1 rounded cursor-pointer ${
                carType === "Used Car"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setCarType("Used Car")}
            >
              Carro Usado
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
                checked={
                  Array.isArray(selectedBrands) &&
                  selectedBrands.includes("All Brand")
                }
                onChange={() => toggleBrand("All Brand")}
                className="rounded cursor-pointer"
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
                  checked={
                    Array.isArray(selectedBrands) &&
                    selectedBrands[0] === brand.name
                  }
                  onChange={() => toggleBrand(brand.name)}
                  className="rounded cursor-pointer font-bold"
                />
              </div>
            ))}
          </div>
          <button className="text-blue-600 mt-2 text-sm">Más Marcas</button>
        </div>
        {/* Price Range */}
        <div className="mb-6 cursor-pointer">
          <Label className="font-medium mb-3 block">Rango de precio</Label>
          <div className="flex items-center justify-between gap-2 mb-2">
            <FaMoneyBillWave className="text-gray-400 mr-2" />
            <output className="text-sm font-medium tabular-nums">
              ${priceRange[0].toLocaleString()} - $
              {priceRange[1].toLocaleString()}
            </output>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={100}
            max={150000}
            step={100}
            aria-label="Dual range slider with output"
          />
        </div>
      </div>
    </div>
  );
}
