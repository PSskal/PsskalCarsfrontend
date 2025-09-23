import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VehicleEditStep = ({ data, onUpdate }) => {
  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Estado del vehículo
        </h2>
        <p className="text-gray-600">
          si tu carro ya fue vendido, puedes actualizar el estado a "Vendido"
          para informar a los compradores interesados.
        </p>
      </div>

      {/* Status del carro */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estado del carro *
        </label>
        <Select
          value={data?.status || ""}
          onValueChange={(value) => handleInputChange("status", value)}
          placeholder="Seleccionar estado"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="disponible">Disponible</SelectItem>
            <SelectItem value="vendido">Vendido</SelectItem>
            <SelectItem value="archivado">Archivado</SelectItem>
          </SelectContent>
        </Select>
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

export default VehicleEditStep;
