import React from "react";
import brands from "./carBrands";

const BrandScrollHorizontal = ({ toggleBrand }) => {
  return (
    <div className="w-full py-2 pt-70">
      <h3 className="text-lg font-semibold mb-4 px-4">Buscar por marcas</h3>
      <div className="flex overflow-x-auto gap-2 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="snap-center flex flex-col items-center min-w-[110px] rounded-lg shadow p-4 hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="w-18 h-18 object-contain mb-2"
              draggable={false}
              onClick={() => toggleBrand(brand.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandScrollHorizontal;
