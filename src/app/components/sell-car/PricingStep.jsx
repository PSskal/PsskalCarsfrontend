import React from "react";
import { DollarSign } from "lucide-react";

const PricingStep = ({ data, onUpdate, vehicleData }) => {
  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Establece tu Precio
        </h2>
        <p className="text-gray-600">
          Establece un precio competitivo basado en el valor de mercado y tus
          preferencias de venta.
        </p>
      </div>

      {/* Pricing Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio de Venta *
          </label>
          <div className="relative flex justify-between gap-2">
            <select
              value={data?.currency || "USD"}
              onChange={(e) => handleInputChange("currency", e.target.value)}
              className="ml-2 border rounded px-2 py-1 text-gray-700"
            >
              <option value="USD">USD</option>
              <option value="PEN">PEN</option>
            </select>

            <input
              type="number"
              value={data?.askingPrice || ""}
              onChange={(e) =>
                handleInputChange("askingPrice", e?.target?.value)
              }
              placeholder="Ej: 200000"
              className="pl-10"
            />
          </div>
        </div>
      </div>
      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          Consejos de Precio:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Los vehículos con precio justo se venden 3x más rápido</li>
          <li>• Considera los costos de reparaciones menores en el precio</li>
          <li>• Estar abierto a negociación atrae más compradores serios</li>
        </ul>
      </div>
    </div>
  );
};

export default PricingStep;
