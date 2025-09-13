import React from "react";
import { Input } from "@/components/ui/input";

const VehicleDetailsStep = ({ data, onUpdate }) => {
  const carMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mazda",
    "Volkswagen",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Subaru",
    "Jeep",
    "Dodge",
    "Chrysler",
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const currentYear = new Date()?.getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Detalles del Vehículo
        </h2>
        <p className="text-gray-600">
          Proporciona información básica sobre tu vehículo para ayudar a los
          compradores.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Make */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca *
          </label>
          <select
            value={data?.make || ""}
            onChange={(e) => handleInputChange("make", e?.target?.value)}
            placeholder="Seleccionar marca"
          >
            {carMakes?.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo *
          </label>
          <input
            type="text"
            value={data?.model || ""}
            onChange={(e) => handleInputChange("model", e?.target?.value)}
            placeholder="Ej: Corolla, Civic, F-150"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Año *
          </label>
          <select
            value={data?.year || ""}
            onValueChange={(value) => handleInputChange("year", value)}
            placeholder="Seleccionar año"
          >
            {years?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Mileage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kilometraje *
          </label>
          <Input
            type="number"
            value={data?.mileage || ""}
            onChange={(e) => handleInputChange("mileage", e?.target?.value)}
            placeholder="Ej: 50000"
          />
        </div>
      </div>
      {/* Features */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Consejo:</strong> Proporciona información precisa y completa
          para atraer a más compradores interesados.
        </p>
      </div>
    </div>
  );
};

export default VehicleDetailsStep;
