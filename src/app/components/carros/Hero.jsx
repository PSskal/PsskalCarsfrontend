"use client";
import React, { useState } from "react";
import { FaSearch, FaFilter, FaSlidersH } from "react-icons/fa";

export default function Hero({
  searchQuery,
  setSearchQuery,
  setSelectedBrands,
  statusCar,
  setStatusCar,
}) {
  return (
    <div className="max-h-screen bg-gray-50 mt-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-8xl mx-auto px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-15">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`rounded-md px-4 py-2 font-medium ${
                    statusCar === "disponible"
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-700"
                  }`}
                  onClick={() => setStatusCar("disponible")}
                >
                  Disponible
                </button>
                <button
                  className={`rounded-md px-4 py-2 font-medium ${
                    statusCar === "vendido"
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-700"
                  }`}
                  onClick={() => setStatusCar("vendido")}
                >
                  Vendido
                </button>
              </div>

              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Encuentra tu auto aquí..."
                  className="pl-10 md:w-120 lg:w-160 py-2 rounded-md border border-gray-300 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length > 0) {
                      // Aquí debes reiniciar el filtro de marcas
                      setSelectedBrands(["All Brand"]);
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-transparent text-gray-700 hover:bg-gray-100">
                <FaFilter className="w-4 h-4" />
                Filter
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <select
                  className="border rounded-md px-3 py-2 text-sm"
                  // value={sortBy}
                  // onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
              <FaSlidersH className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
