"use client";
import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCarContext } from "@/context/CarContext";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Loader from "@/components/carros/Loader";

// Componentes de arquitectura limpia
import { useCarDetails } from "@/lib/hooks/useCarDetails";
import CarImageCarousel from "@/components/car-details/CarImageCarousel";
import CarDetailsGrid from "@/components/car-details/CarDetailsGrid";
import CarContactCard from "@/components/car-details/CarContactCard";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { cars, setCar } = useCarContext();

  // Custom hook que maneja toda la lógica de datos
  const { car, images, loading, error } = useCarDetails(id, cars);

  // Sincronizar con el contexto cuando se obtenga el carro
  React.useEffect(() => {
    if (car) {
      setCar(car);
    }
  }, [car, setCar]);

  // Memoizar el título del carro para evitar recálculos
  const carTitle = useMemo(() => {
    return car ? `${car.brand} ${car.model}` : "Vehículo";
  }, [car?.brand, car?.model]);

  // Manejar estados de carga y error
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.back()} variant="outline">
            <FaArrowLeft className="mr-2" /> Volver
          </Button>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vehículo no encontrado
          </h2>
          <Button onClick={() => router.back()} variant="outline">
            <FaArrowLeft className="mr-2" /> Volver a todos los autos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white">
      {/* Header con botón de retroceso */}
      <header className="py-8">
        <Button
          className="bg-white hover:bg-gray-50 flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => router.back()}
          variant="ghost"
        >
          <FaArrowLeft /> Volver a todos los autos
        </Button>
      </header>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-8">
        {/* Información del vehículo - Columna izquierda */}
        <section className="lg:col-span-2" aria-labelledby="vehicle-details">
          {/* Carrusel de imágenes */}
          <CarImageCarousel images={images} carTitle={carTitle} />

          {/* Información del vehículo */}
          <div className="space-y-6">
            <header>
              <h1 id="vehicle-details" className="text-3xl font-bold lg:mt-8">
                {carTitle}
              </h1>
            </header>

            <div>
              <h2 className="text-xl font-semibold mt-8">
                Información del vehículo
              </h2>
              <hr className="border-borderColor my-6" />

              {/* Grid de detalles */}
              <CarDetailsGrid car={car} />
            </div>

            {/* Información adicional */}
            {car.description && (
              <section className="lg:mb-16" aria-labelledby="additional-info">
                <h2 id="additional-info" className="text-xl font-medium mb-3">
                  Información adicional
                </h2>
                <p className="text-gray-500 whitespace-pre-wrap">
                  {car.description}
                </p>
              </section>
            )}
          </div>
        </section>

        {/* Tarjeta de contacto - Columna derecha */}
        <aside className="lg:col-span-1" aria-labelledby="contact-section">
          <h2 id="contact-section" className="sr-only">
            Información de contacto
          </h2>
          <CarContactCard car={car} />
        </aside>
      </div>
    </main>
  );
}
