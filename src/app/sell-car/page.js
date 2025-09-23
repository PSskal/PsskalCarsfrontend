"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  Camera,
  Phone,
  Check,
} from "lucide-react";
import VehicleDetailsStep from "@/app/components/sell-car/VehicleDetailsStep";
import PhotoUploadStep from "@/app/components/sell-car/PhotoUploadStep";
import ContactStep from "@/app/components/sell-car/ContactStep";
import { carService } from "@/lib/supabase/services";
import Verification from "../components/sell-car/Verification";
import ListingPreview from "../components/sell-car/ListingPreview";
const getInitialFormState = () => ({
  vehicleDetails: {
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    features: [],
    category: "",
    color: "",
    fuel_type: "",
    transmission: "",
    traction: "",
  },
  contact: {
    phone: "",
    currency: "USD",
    askingPrice: "",
    location: "",
    additionalInfo: "",
  },
  photos: [],
  car_token: "",
});

const SellCar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(getInitialFormState());
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const { getKeysAuth } = carService;
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    async function fetchKeys() {
      const result = await getKeysAuth();
      setKeys(Array.isArray(result) ? result : []);
    }
    fetchKeys();
  }, []);

  const steps = [
    {
      id: 1,
      title: "Detalles",
      icon: Car,
      description: "Información básica de tu vehículo",
    },

    {
      id: 2,
      title: "Preferencia",
      icon: Phone,
      description: "Preferencias de comunicación",
    },
    {
      id: 3,
      title: "Fotos",
      icon: Camera,
      description: "Imágenes de alta calidad",
    },
    {
      id: 4,
      title: "Publicar",
      icon: Check,
      description: "Revisar y publicar",
    },
  ];

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: Array.isArray(data) ? data : { ...prev?.[section], ...data },
    }));

    if (status.type) {
      setStatus({ type: null, message: "" });
    }
  };

  const handleTokenChange = (tokenValue) => {
    setFormData((prev) => ({
      ...prev,
      car_token: tokenValue,
    }));

    if (status.type) {
      setStatus({ type: null, message: "" });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
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
          <ContactStep
            data={formData?.contact}
            onUpdate={(data) => updateFormData("contact", data)}
          />
        );
      case 3:
        return (
          <PhotoUploadStep
            data={formData?.photos}
            onUpdate={(data) => updateFormData("photos", data)}
          />
        );
      case 4:
        return <ListingPreview data={formData} onTokenChange={handleTokenChange} />;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    const { vehicleDetails, contact, photos, car_token } = formData;

    const validations = [
      { isValid: !!vehicleDetails.make, label: "Marca", step: 1 },
      { isValid: !!vehicleDetails.model, label: "Modelo", step: 1 },
      { isValid: !!vehicleDetails.year, label: "Año", step: 1 },
      { isValid: !!vehicleDetails.category, label: "Categoría", step: 1 },
      {
        isValid: !!vehicleDetails.fuel_type,
        label: "Tipo de combustible",
        step: 1,
      },
      { isValid: !!vehicleDetails.transmission, label: "Transmisión", step: 1 },
      { isValid: !!vehicleDetails.traction, label: "Tracción", step: 1 },
      { isValid: !!vehicleDetails.color, label: "Color", step: 1 },
      { isValid: !!vehicleDetails.mileage, label: "Kilometraje", step: 1 },
      { isValid: !!contact.phone, label: "Teléfono de contacto", step: 2 },
      { isValid: !!contact.askingPrice, label: "Precio de venta", step: 2 },
      { isValid: !!contact.location, label: "Ubicación", step: 2 },
      { isValid: photos?.length > 0, label: "Al menos una foto", step: 3 },
      {
        isValid: /^\d{4}$/.test((car_token || "").trim()),
        label: "Código de verificación de 4 dígitos",
        step: 4,
      },
    ];

    const missing = validations.filter((item) => !item.isValid);

    if (missing.length) {
      const firstMissingStep = missing[0].step;
      if (currentStep !== firstMissingStep) {
        setCurrentStep(firstMissingStep);
      }

      const labels = missing.map((item) => item.label).join(", ");
      setStatus({
        type: "error",
        message: `Completa los siguientes campos: ${labels}.`,
      });
      return;
    }

    setIsSubmitting(true);

    let uploadedUrls = [];
    try {
      uploadedUrls = await carService.uploadCarImages(photos);
    } catch (uploadError) {
      console.error("Failed to upload car images:", uploadError);
      setStatus({
        type: "error",
        message: "No se pudieron subir las fotos. Inténtalo nuevamente.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!uploadedUrls.length) {
      setStatus({
        type: "error",
        message:
          "No se generaron enlaces para las fotos. Verifica el bucket carimages.",
      });
      setIsSubmitting(false);
      return;
    }

    const year = Number(vehicleDetails.year);
    const mileage = Number(vehicleDetails.mileage);
    const price = Number(contact.askingPrice);
    const primaryImage = uploadedUrls[0];

    const carPayload = {
      brand: vehicleDetails.make,
      model: vehicleDetails.model,
      year: Number.isNaN(year) ? undefined : year,
      category: vehicleDetails.category,
      image: primaryImage,
      price: Number.isNaN(price) ? undefined : price,
      currency: contact.currency || "USD",
      is_available: true,
      mileage: Number.isNaN(mileage) ? undefined : mileage,
      color: vehicleDetails.color,
      fuel_type: vehicleDetails.fuel_type,
      transmission: vehicleDetails.transmission,
      drive_type: vehicleDetails.traction,
      location: contact.location,
      description: contact.additionalInfo || "",
      contact_phone: contact.phone,
      car_token: car_token?.trim(),
    };

    const sanitizedPayload = Object.fromEntries(
      Object.entries(carPayload).filter(([, value]) => {
        if (typeof value === "number") {
          return !Number.isNaN(value);
        }
        return value !== undefined && value !== null && value !== "";
      })
    );

    try {
      await carService.createCarListing(sanitizedPayload, uploadedUrls);
      setStatus({
        type: "success",
        message: "Tu anuncio se publicó correctamente.",
      });
      setFormData(getInitialFormState());
      setCurrentStep(1);
    } catch (error) {
      console.error("Failed to create car listing:", error);
      setStatus({
        type: "error",
        message: "No se pudo publicar el anuncio. Inténtalo nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              className="bg-white hover:bg-gray-100 flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft /> Back to all Cars
            </Button>
            {/* <h1 className="text-2xl font-bold text-gray-900">
              Vender Mi Carro
            </h1> */}
            <div className="text-sm text-gray-500">
              Paso {currentStep} de {steps?.length}
            </div>
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      {/* Verification gate: show Verification until user completes it */}
      {!isVerified ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Verification
            onVerified={(inputCode) => {
              const normalizedInput = String(inputCode ?? "").trim();
              const hasValidMatch =
                Array.isArray(keys) &&
                keys.some(
                  (item) =>
                    String(item?.auth_key ?? "").trim() === normalizedInput
                );

              if (hasValidMatch) {
                setIsVerified(true);
                setStatus({ type: null, message: "" });
              } else {
                setStatus({
                  type: "error",
                  message:
                    "El código ingresado no es correcto. Intenta nuevamente.",
                });
              }
            }}
          />
          {status.type === "error" && (
            <div className="mb-4 rounded-md border px-4 py-3 text-sm border-red-200 bg-red-50 text-red-700">
              {status.message}
            </div>
          )}
        </div>
      ) : (
        <>
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
                              ? "bg-blue-900 border-blue-900 text-white"
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
                                ? "text-blue-900"
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
                            currentStep > step?.id
                              ? "bg-blue-900"
                              : "bg-gray-300"
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
            {status.message && (
              <div
                className={`mb-6 rounded-md border px-4 py-3 text-sm ${
                  status.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-green-200 bg-green-50 text-green-700"
                }`}
              >
                {status.message}
              </div>
            )}
            <div className="bg-white rounded-lg shadow-sm border">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                  disabled={isSubmitting}
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publicando..." : "Publicar Anuncio"}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SellCar;

