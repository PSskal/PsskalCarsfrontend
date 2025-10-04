"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const vehicleStatusOptions = [
  {
    name: "Disponible",
    value: "disponible",
    description: "Tu vehículo está activo y visible para compradores",
    features: [
      "Visible en búsquedas",
      "Recibir mensajes",
      "Estadísticas activas",
    ],
    popular: false,
    variant: "default",
    colors: {
      badge: "bg-green-500 text-white",
      border: "border-green-500",
      bg: "bg-green-50/50",
      text: "text-green-600",
      check: "text-green-500",
      button: "bg-green-500",
    },
  },
  {
    name: "Vendido",
    value: "vendido",
    description: "El vehículo ya fue vendido exitosamente",
    features: [
      "Oculto de búsquedas",
      "Notificar interesados",
      "Historial preservado",
    ],
    popular: false,
    variant: "secondary",
    colors: {
      badge: "bg-blue-500 text-white",
      border: "border-blue-500",
      bg: "bg-blue-50/50",
      text: "text-blue-600",
      check: "text-blue-500",
      button: "bg-blue-500",
    },
  },
  {
    name: "Archivado",
    value: "archivado",
    description: "Temporalmente inactivo, no visible para compradores",
    features: [
      "Pausar publicación",
      "Mantener información",
      "Reactivar cuando desees",
    ],
    popular: false,
    variant: "outline",
    colors: {
      badge: "bg-gray-500 text-white",
      border: "border-gray-500",
      bg: "bg-gray-50/50",
      text: "text-gray-600",
      check: "text-gray-500",
      button: "bg-gray-500",
    },
  },
];

const VehicleEditStep = ({ data, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    data?.status || "vendido"
  );

  useEffect(() => {
    setSelectedStatus(data?.status || "vendido");
  }, [data?.status]);

  const handleStatusChange = (statusValue) => {
    setSelectedStatus(statusValue);

    // Preparar los campos a actualizar
    const updates = { status: statusValue };

    // Si es "archivado", también cambiar is_available a false
    if (statusValue === "archivado") {
      updates.is_available = false;
    } else if (statusValue === "disponible") {
      // Si es "disponible", asegurar que is_available sea true
      updates.is_available = true;
    }

    onUpdate?.(updates);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Estado del Vehículo
          </h1>
          <p className="text-muted-foreground text-lg">
            Si tu carro ya fue vendido, puedes actualizar el estado para
            informar a los compradores interesados
          </p>
        </div>

        <div className="space-y-6">
          {vehicleStatusOptions.map((option) => {
            const isSelected = selectedStatus === option.value;
            const { colors } = option;

            return (
              <Card
                key={option.value}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? `${colors.border} border-2 shadow-lg ${colors.bg}`
                    : option.popular
                    ? `${colors.border} border-2 shadow-lg`
                    : "border-border hover:border-blue-300"
                }`}
                onClick={() => handleStatusChange(option.value)}
              >
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? `${colors.border.replace("border-", "bg-")} ${
                            colors.border
                          }`
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="h-4 w-4 text-white" />}
                  </div>
                </div>

                <CardHeader className="text-center pb-4 pr-12">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {option.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {option.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center py-3">
                    <span
                      className={`font-medium ${
                        isSelected ? colors.text : "text-muted-foreground"
                      }`}
                    >
                      {isSelected
                        ? "Estado Seleccionado"
                        : "Clic para seleccionar"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check
                          className={`h-5 w-5 ${colors.check} flex-shrink-0`}
                        />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VehicleEditStep;
