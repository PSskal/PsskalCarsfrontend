import React from "react";
import { BsPeopleFill, BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { IoIosColorFill } from "react-icons/io";
import { VscSymbolProperty } from "react-icons/vsc";
import { TbCategoryFilled } from "react-icons/tb";

const CarDetailsGrid = ({ car }) => {
  const carDetails = [
    {
      icon: <TbCategoryFilled />,
      text: car.category,
      info: "Categoría",
    },
    {
      icon: <FaRegCalendarTimes />,
      text: car.year,
      info: "Año Modelo",
    },
    {
      icon: <IoIosColorFill />,
      text: car.color,
      info: "Color",
    },
    {
      icon: <BsFillFuelPumpFill />,
      text: car.fuel_type,
      info: "Combustible",
    },
    {
      icon: <FaCarAlt />,
      text: car.transmission,
      info: "Transmisión",
    },
    {
      icon: <MdLocationPin />,
      text: car.location,
      info: "Ubicación",
    },
    {
      icon: <FaCarAlt />,
      text: `${car.mileage?.toLocaleString("es-PE") || "N/A"} km`,
      info: "Kilometraje",
    },
    {
      icon: <VscSymbolProperty />,
      text: car.drive_type,
      info: "Tracción",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {carDetails.map(({ icon, text, info }) => (
        <div
          key={info}
          className="flex flex-col items-center bg-white rounded-lg p-4 text-gray-500 shadow-lg"
        >
          <div className="p-4 flex flex-col items-center justify-center h-full">
            <span className="w-6 h-6 text-gray-900 mb-2 font-bold">{icon}</span>
            <p className="text-xs text-gray-500 mb-1">{info}</p>
            <p className="text-sm font-semibold text-gray-900">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarDetailsGrid;
