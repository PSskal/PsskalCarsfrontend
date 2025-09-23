"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

import VehicleEditStep from "@/app/components/manage/VehicleEditStep";
import VerificationManage from "@/app/components/manage/VerificationManage";

const ManageCar = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [carData, setCarData] = useState({
    /* datos iniciales */
  });

  useEffect(() => {
    // Aquí deberías cargar los datos del carro usando el id de la URL
    // setCarData(datosCargados);
  }, []);

  const handleUpdate = (updatedFields) => {
    setCarData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    // Aquí puedes llamar a Supabase para guardar los cambios si quieres
  };
  console.log(carData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              className="bg-white hover:bg-gray-100 flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft /> Volver a todos los autos
            </Button>
            <div className="text-sm text-gray-500">Editar vehículo</div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {!isVerified ? (
            <VerificationManage
              onVerified={(code) => {
                // Aquí deberías validar el código ingresado
                // Si es correcto:
                setIsVerified(true);
                // Si no, puedes mostrar un mensaje de error (agrega lógica si lo necesitas)
              }}
            />
          ) : (
            <VehicleEditStep data={carData} onUpdate={handleUpdate} />
          )}
        </div>
        {isVerified && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? "Actualizando..." : "Actualizar Anuncio"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ManageCar;
