"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  Camera,
  DollarSign,
  Phone,
  Eye,
  Check,
} from "lucide-react";
import VehicleDetailsStep from "@/app/components/sell-car/VehicleDetailsStep";
import PhotoUploadStep from "@/app/components/sell-car/PhotoUploadStep";
import PricingStep from "@/app/components/sell-car/PricingStep";
import ContactStep from "@/app/components/sell-car/ContactStep";
import ListingPreview from "@/app/components/sell-car/ListingPreview";

const SellCar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleDetails: {
      make: "",
      model: "",
      year: "",
      mileage: "",
      condition: "",
      features: [],
    },
    photos: [],
    pricing: {
      askingPrice: "",
      marketValue: "",
      negotiable: false,
      financeOptions: false,
    },
    contact: {
      method: "phone",
      responseTime: "24hours",
      availability: "weekdays",
    },
  });

  const steps = [
    {
      id: 1,
      title: "Detalles del Vehículo",
      icon: Car,
      description: "Información básica de tu vehículo",
    },
    {
      id: 2,
      title: "Fotos",
      icon: Camera,
      description: "Imágenes de alta calidad",
    },
    {
      id: 3,
      title: "Precio",
      icon: DollarSign,
      description: "Establece tu precio de venta",
    },
    {
      id: 4,
      title: "Contacto",
      icon: Phone,
      description: "Preferencias de comunicación",
    },
    {
      id: 5,
      title: "Vista Previa",
      icon: Eye,
      description: "Revisa antes de publicar",
    },
  ];

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev?.[section], ...data },
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VehicleDetailsStep
            data={formData?.vehicleDetails}
            onUpdate={(data) => updateFormData("vehicleDetails", data)}
          />
        );
      case 2:
        return (
          <PhotoUploadStep
            data={formData?.photos}
            onUpdate={(data) => updateFormData("photos", data)}
          />
        );
      case 3:
        return (
          <PricingStep
            data={formData?.pricing}
            onUpdate={(data) => updateFormData("pricing", data)}
            vehicleData={formData?.vehicleDetails}
          />
        );
      case 4:
        return (
          <ContactStep
            data={formData?.contact}
            onUpdate={(data) => updateFormData("contact", data)}
          />
        );
      case 5:
        return <ListingPreview data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Vender Mi Carro
            </h1>
            <div className="text-sm text-gray-500">
              Paso {currentStep} de {steps?.length}
            </div>
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => {
              const StepIcon = step?.icon;
              const isCompleted = currentStep > step?.id;
              const isCurrent = currentStep === step?.id;

              return (
                <div key={step?.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isCompleted
                          ? "bg-green-600 border-green-600 text-white"
                          : isCurrent
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-medium ${
                          isCurrent
                            ? "text-blue-600"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step?.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden sm:block">
                        {step?.description}
                      </div>
                    </div>
                  </div>
                  {index < steps?.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        currentStep > step?.id ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {currentStep < 5 ? (
            <button onClick={nextStep} className="flex items-center space-x-2">
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button className="bg-green-600 hover:bg-green-700">
              Publicar Anuncio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellCar;
