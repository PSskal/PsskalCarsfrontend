"use client";
import React, { useRef } from "react";
import CarCard from "../carros/CarCard";
import { Input } from "@/components/ui/input";

const ListingPreview = ({ data, onTokenChange }) => {
  const vehicleDetails = data?.vehicleDetails || {};
  const photos = data?.photos || [];

  // Función para procesar campos personalizados para la vista previa
  const processCustomFields = (vehicleDetails) => {
    return {
      make:
        vehicleDetails.make === "Otro" && vehicleDetails.customMake
          ? vehicleDetails.customMake
          : vehicleDetails.make,
      category:
        vehicleDetails.category === "Otro" && vehicleDetails.customCategory
          ? vehicleDetails.customCategory
          : vehicleDetails.category,
      color:
        vehicleDetails.color === "Otro" && vehicleDetails.customColor
          ? vehicleDetails.customColor
          : vehicleDetails.color,
    };
  };

  // Procesar los campos personalizados
  const processedFields = processCustomFields(vehicleDetails);

  const CODE_LENGTH = 4;
  const sanitizedToken = (data?.car_token ?? "")
    .replace(/\D/g, "")
    .slice(0, CODE_LENGTH);
  const digits = Array.from(
    { length: CODE_LENGTH },
    (_, index) => sanitizedToken[index] || ""
  );

  const inputsRef = useRef([]);

  const handleCodeChange = (index, rawValue) => {
    const value = (rawValue || "").replace(/\D/g, "");
    const nextDigits = [...digits];
    nextDigits[index] = value.slice(0, 1);
    onTokenChange?.(nextDigits.join(""));
    if (nextDigits[index] && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    const key = e.key;
    if (key === "Backspace" || key === "Delete") {
      if (!digits[index] && index > 0) {
        e.preventDefault();
        const prevIndex = index - 1;
        inputsRef.current[prevIndex]?.focus();
        const nextDigits = [...digits];
        nextDigits[prevIndex] = "";
        onTokenChange?.(nextDigits.join(""));
      }
    } else if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < CODE_LENGTH - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    const chars = pasted.slice(0, CODE_LENGTH).split("");
    const nextDigits = Array.from(
      { length: CODE_LENGTH },
      (_, i) => chars[i] || ""
    );
    onTokenChange?.(nextDigits.join(""));
    const focusIndex = Math.min(chars.length, CODE_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vista Previa del Anuncio
        </h2>
        <p className="text-gray-600">
          Revisa cómo verán tu anuncio los compradores potenciales.
        </p>
      </div>
      {/* Listing Preview Card */}
      {/* Preview del carro */}
      <div className="max-w-md mx-auto mb-8">
        <CarCard
          car={{
            id: "preview",
            image: photos[0]?.url || photos[0] || "/placeholder.svg",
            brand: processedFields.make,
            model: vehicleDetails.model,
            year: vehicleDetails.year,
            category: processedFields.category,
            price: Number(data?.contact?.askingPrice) || 0,
            currency: data?.contact?.currency || "USD",
            is_available: true,
            color: processedFields.color,
            fuel_type: vehicleDetails.fuel_type,
            transmission: vehicleDetails.transmission,
            location: data?.contact?.location,
            posted_at: new Date().toISOString(),
            status: "disponible",
          }}
          disableNavigation
        />
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-500 mb-4">
          Ingresa tu token de 4 dígitos
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {digits.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              className="w-12 h-12 text-center text-lg font-medium border-2 border-slate-300 focus:border-purple-600"
            />
          ))}
        </div>
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-xs text-center">
          <strong>Importante:</strong> Guarda este token. Lo necesitarás para
          editar tu anuncio, marcarlo como vendido o ampliar la publicación en
          el futuro. Si lo pierdes, no podrás gestionar tu anuncio.
        </div>
      </div>

      {/* Publishing Tips */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2">
          ¡Listo para Publicar!
        </h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Tu anuncio aparecerá en las búsquedas inmediatamente</li>
          <li>• Recibirás notificaciones de consultas por</li>

          <li>• Los anuncios completos reciben 5x más consultas</li>
        </ul>
      </div>
    </div>
  );
};

export default ListingPreview;
