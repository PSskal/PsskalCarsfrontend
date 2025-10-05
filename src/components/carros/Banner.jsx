"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="w-full h-full">
      {/* Sidebar Filters - Completamente responsive */}
      <div className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800">
            Filtros
          </h3>
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm cursor-pointer transition-colors rounded-lg px-2 py-1 hover:bg-blue-50"
          >
            <FaRedo className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
        {/* Transmisión Automática */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="text-sm sm:text-base font-medium text-gray-700">
                Automática
              </span>
            </div>
            <input
              type="checkbox"
              checked={isAutomatic}
              className="rounded cursor-pointer w-4 h-4 sm:w-5 sm:h-5 text-blue-600 focus:ring-blue-500"
              onChange={(e) => setIsAutomatic(e.target.checked)}
            />
          </div>
        </div>
        {/* Type of Car */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-gray-800">
            Tipo de carro
          </h4>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              className={`px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 rounded-lg cursor-pointer font-medium text-xs sm:text-sm md:text-base transition-all duration-200 ${
                carType === "New Car"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
              }`}
              onClick={() => setCarType("New Car")}
            >
              Nuevo
            </button>
            <button
              className={`px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 rounded-lg cursor-pointer font-medium text-xs sm:text-sm md:text-base transition-all duration-200 ${
                carType === "Used Car"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
              }`}
              onClick={() => setCarType("Used Car")}
            >
              Usado
            </button>
          </div>
        </div>
        {/* Brand */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h4 className="mb-2 sm:mb-3 font-bold text-sm sm:text-base md:text-lg text-gray-800">
            Marcas
          </h4>

          {/* "Todas las marcas" - Fijo fuera del scroll */}
          <div className="mb-2">
            <div className="flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2 rounded-md hover:bg-blue-50 transition-colors bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  Todas las marcas
                </span>
              </div>
              <input
                type="checkbox"
                checked={
                  Array.isArray(selectedBrands) &&
                  selectedBrands.includes("All Brand")
                }
                onChange={() => toggleBrand("All Brand")}
                className="rounded cursor-pointer w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Lista de marcas específicas - Con ScrollArea de shadcn */}
          <ScrollArea className="h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80 border border-gray-200 rounded-md">
            <div className="space-y-0 p-1">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-between px-2 py-1 sm:px-3 sm:py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <img
                      src={brand.img}
                      alt={brand.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                      {brand.name}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(selectedBrands) &&
                      selectedBrands[0] === brand.name
                    }
                    onChange={() => toggleBrand(brand.name)}
                    className="rounded cursor-pointer w-4 h-4 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        {/* Price Range */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <Label className="font-bold text-sm sm:text-base md:text-lg text-gray-800 mb-2 sm:mb-3 block">
            Rango de precio
          </Label>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 md:p-5 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
              <FaMoneyBillWave className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
              <output className="text-xs sm:text-sm md:text-base font-bold tabular-nums text-gray-800 bg-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg shadow-sm text-center min-w-0">
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
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
