import React from "react";

// Ejemplo de marcas, puedes cambiar las imágenes por las de tu preferencia
const brands = [
  {
    name: "BMW",
    img: "https://hips.hearstapps.com/hmg-prod/images/bmw-2020-logo-1583420702.png?crop=0.891xw:0.770xh;0.0523xw,0.109xh&resize=980:*",
  },
  {
    name: "Mercedes",
    img: "https://brandemia.org/contenido/subidas/2021/12/07-mercedes-logo-2009-2011-hasta-hoy-1200x670.jpg",
  },
  {
    name: "Tesla",
    img: "https://www.clipartmax.com/png/middle/39-396698_tesla-logo-%5Beps-motors%5D-tesla-logo-icon.png",
  },
  {
    name: "Audi",
    img: "https://e7.pngegg.com/pngimages/327/426/png-clipart-audi-car-vehicle-logo-audi-company-logo.png",
  },
  {
    name: "Toyota",
    img: "https://e7.pngegg.com/pngimages/186/0/png-clipart-toyota-logo-2017-toyota-camry-car-logo-toyota-car-logo-brand-emblem-company.png",
  },
  {
    name: "Honda",
    img: "https://img.favpng.com/21/9/16/honda-logo-honda-civic-type-r-car-honda-cr-v-png-favpng-iSH9M91vrSjYj3D49UmkyqpJw.jpg",
  },
  {
    name: "Ford",
    img: "https://www.ford.pe/content/dam/Ford/website-assets/latam/pe/open-graph/2025/global/fpe-ford-thumbnail.png",
  },
  {
    name: "Kia",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg",
  },
];

const BrandScrollHorizontal = () => {
  return (
    <div className="w-full py-2">
      <h3 className="text-lg font-semibold mb-4 px-4">Buscar por marcas</h3>
      <div className="flex overflow-x-auto gap-2 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="snap-center flex flex-col items-center min-w-[110px] bg-white rounded-lg shadow p-4 hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="w-18 h-18 object-contain mb-2"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandScrollHorizontal;
