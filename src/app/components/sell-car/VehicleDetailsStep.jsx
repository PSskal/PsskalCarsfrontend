import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const categories = [
    "Sedán",
    "SUV",
    "Hatchback",
    "Pickup",
    "Convertible",
    "Van",
    "Wagon",
    "Otro",
  ];
  const colors = ["Negro", "Blanco", "Gris", "Plata", "Rojo", "Azul", "Otro"];
  const fuelTypes = [
    "Gasolina",
    "Diésel",
    "Híbrido",
    "Eléctrico",
    "GLP",
    "GNV",
  ];
  const transmissions = ["Automática", "Mecánica"];
  const tractions = ["Delantera", "Trasera", "4x4", "AWD"];

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
        {/* Marca */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca *
          </label>
          <Select
            value={data?.make || ""}
            onValueChange={(value) => handleInputChange("make", value)}
            placeholder="Seleccionar marca"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar marca" />
            </SelectTrigger>
            <SelectContent>
              {carMakes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Modelo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo *
          </label>
          <Input
            type="text"
            value={data?.model || ""}
            onChange={(e) => handleInputChange("model", e.target.value)}
            placeholder="Ej: Corolla, Civic, F-150"
          />
        </div>
        {/* Año */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Año *
          </label>
          <Select
            value={data?.year || ""}
            onValueChange={(value) => handleInputChange("year", value)}
            placeholder="Seleccionar año"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Kilometraje */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kilometraje *
          </label>
          <Input
            type="number"
            value={data?.mileage || ""}
            onChange={(e) => handleInputChange("mileage", e.target.value)}
            placeholder="Ej: 50000"
          />
        </div>
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría *
          </label>
          <Select
            value={data?.category || ""}
            onValueChange={(value) => handleInputChange("category", value)}
            placeholder="Seleccionar categoría"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color *
          </label>
          <Select
            value={data?.color || ""}
            onValueChange={(value) => handleInputChange("color", value)}
            placeholder="Seleccionar color"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Tipo de combustible */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de combustible *
          </label>
          <Select
            value={data?.fuel_type || ""}
            onValueChange={(value) => handleInputChange("fuel_type", value)}
            placeholder="Seleccionar tipo"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              {fuelTypes.map((fuel) => (
                <SelectItem key={fuel} value={fuel}>
                  {fuel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Transmisión */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmisión *
          </label>
          <Select
            value={data?.transmission || ""}
            onValueChange={(value) => handleInputChange("transmission", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar transmisión" />
            </SelectTrigger>
            <SelectContent>
              {transmissions.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Tracción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de tracción *
          </label>

          <Select
            value={data?.traction || ""}
            onValueChange={(value) => handleInputChange("traction", value)}
            placeholder="Seleccionar tracción"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar tracción" />
            </SelectTrigger>
            <SelectContent>
              {tractions.map((tr) => (
                <SelectItem key={tr} value={tr}>
                  {tr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
