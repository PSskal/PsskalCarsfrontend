"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  Camera,
  Phone,
  Check,
  CheckCircle,
  XCircle,
  X,
  Clock,
} from "lucide-react";
import VehicleDetailsStep from "@/components/sell-car/VehicleDetailsStep";
import PhotoUploadStep from "@/components/sell-car/PhotoUploadStep";
import ContactStep from "@/components/sell-car/ContactStep";
import { carService } from "@/lib/supabase/services";
import Verification from "../../components/sell-car/Verification";
import ListingPreview from "../../components/sell-car/ListingPreview";
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

// Constants
const STEPS_CONFIG = [
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

const VALIDATION_RULES = [
  { field: "vehicleDetails.make", label: "Marca", step: 1 },
  { field: "vehicleDetails.model", label: "Modelo", step: 1 },
  { field: "vehicleDetails.year", label: "Año", step: 1 },
  { field: "vehicleDetails.category", label: "Categoría", step: 1 },
  { field: "vehicleDetails.fuel_type", label: "Tipo de combustible", step: 1 },
  { field: "vehicleDetails.transmission", label: "Transmisión", step: 1 },
  { field: "vehicleDetails.traction", label: "Tracción", step: 1 },
  { field: "vehicleDetails.color", label: "Color", step: 1 },
  { field: "vehicleDetails.mileage", label: "Kilometraje", step: 1 },
  { field: "contact.phone", label: "Teléfono de contacto", step: 2 },
  { field: "contact.askingPrice", label: "Precio de venta", step: 2 },
  { field: "contact.location", label: "Ubicación", step: 2 },
];

const SellCar = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(getInitialFormState());
  const [status, setStatus] = useState({ type: null, message: "" });
  const [publishStatus, setPublishStatus] = useState({
    type: null,
    message: "",
    visible: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [keys, setKeys] = useState([]);
  const [redirectCountdown, setRedirectCountdown] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Fetch authentication keys
  useEffect(() => {
    let mounted = true;

    const fetchKeys = async () => {
      try {
        const result = await carService.getKeysAuth();
        if (mounted) {
          setKeys(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        console.error("Failed to fetch keys:", error);
        if (mounted) {
          setKeys([]);
        }
      }
    };

    fetchKeys();
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-dismiss feedback después de 5 segundos (solo para errores)
  useEffect(() => {
    if (publishStatus.visible && publishStatus.type === "error") {
      const timer = setTimeout(() => {
        setPublishStatus((prev) => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [publishStatus.visible, publishStatus.type]);

  // Auto-redirect countdown para publicaciones exitosas
  useEffect(() => {
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirectCountdown === 0 && isRedirecting) {
      // Redirect al menú principal
      router.push("/");
    }
  }, [redirectCountdown, isRedirecting, router]);

  // Helper functions
  const clearStatus = () => setStatus({ type: null, message: "" });

  const clearPublishStatus = () =>
    setPublishStatus({ type: null, message: "", visible: false });

  const showPublishFeedback = (type, message) => {
    setPublishStatus({ type, message, visible: true });
  };

  const hidePublishFeedback = () => {
    setPublishStatus((prev) => ({ ...prev, visible: false }));
  };

  const startRedirectCountdown = () => {
    setRedirectCountdown(3); // 3 segundos para redirect
    setIsRedirecting(true);
  };

  const cancelRedirect = () => {
    setRedirectCountdown(0);
    setIsRedirecting(false);
  };

  const getFieldValue = (field, data = formData) => {
    return field.split(".").reduce((obj, key) => obj?.[key], data);
  };

  const isValidField = (field, data = formData) => {
    const value = getFieldValue(field, data);
    if (field === "photos") return data.photos?.length > 0;
    if (field === "car_token")
      return /^\d{4}$/.test((data.car_token || "").trim());

    // Validación especial para campos con opción "Otro"
    if (field === "vehicleDetails.make") {
      return value && (value !== "Otro" || !!data.vehicleDetails?.customMake);
    }
    if (field === "vehicleDetails.category") {
      return (
        value && (value !== "Otro" || !!data.vehicleDetails?.customCategory)
      );
    }
    if (field === "vehicleDetails.color") {
      return value && (value !== "Otro" || !!data.vehicleDetails?.customColor);
    }

    return !!value;
  };

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: Array.isArray(data) ? data : { ...prev?.[section], ...data },
    }));
    clearStatus();
    clearPublishStatus();
  };

  const handleTokenChange = (tokenValue) => {
    setFormData((prev) => ({ ...prev, car_token: tokenValue }));
    clearStatus();
  };

  const nextStep = () => {
    if (currentStep < STEPS_CONFIG.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    const stepComponents = {
      1: () => (
        <VehicleDetailsStep
          data={formData?.vehicleDetails}
          onUpdate={(data) => updateFormData("vehicleDetails", data)}
        />
      ),
      2: () => (
        <ContactStep
          data={formData?.contact}
          onUpdate={(data) => updateFormData("contact", data)}
        />
      ),
      3: () => (
        <PhotoUploadStep
          data={formData?.photos}
          onUpdate={(data) => updateFormData("photos", data)}
        />
      ),
      4: () => (
        <ListingPreview data={formData} onTokenChange={handleTokenChange} />
      ),
    };

    return stepComponents[currentStep]?.() || null;
  };

  const validateForm = () => {
    const validations = [
      ...VALIDATION_RULES.map((rule) => ({
        ...rule,
        isValid: isValidField(rule.field),
      })),
      {
        field: "photos",
        label: "Al menos una foto",
        step: 3,
        isValid: isValidField("photos"),
      },
      {
        field: "car_token",
        label: "Código de verificación de 4 dígitos",
        step: 4,
        isValid: isValidField("car_token"),
      },
    ];

    const missing = validations.filter((item) => !item.isValid);

    if (missing.length > 0) {
      const firstMissingStep = missing[0].step;
      if (currentStep !== firstMissingStep) {
        setCurrentStep(firstMissingStep);
      }

      const labels = missing.map((item) => item.label).join(", ");
      setStatus({
        type: "error",
        message: `Completa los siguientes campos: ${labels}.`,
      });
      return false;
    }

    return true;
  };

  // Función para procesar campos personalizados
  const processCustomFields = (vehicleDetails) => {
    return {
      ...vehicleDetails,
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

  const createCarPayload = (
    vehicleDetails,
    contact,
    car_token,
    primaryImage
  ) => {
    // Procesar campos personalizados antes de crear el payload
    const processedVehicleDetails = processCustomFields(vehicleDetails);

    const year = Number(processedVehicleDetails.year);
    const mileage = Number(processedVehicleDetails.mileage);
    const price = Number(contact.askingPrice);

    const payload = {
      brand: processedVehicleDetails.make,
      model: processedVehicleDetails.model,
      year: Number.isNaN(year) ? undefined : year,
      category: processedVehicleDetails.category,
      image: primaryImage,
      price: Number.isNaN(price) ? undefined : price,
      currency: contact.currency || "USD",
      is_available: true,
      mileage: Number.isNaN(mileage) ? undefined : mileage,
      color: processedVehicleDetails.color,
      fuel_type: processedVehicleDetails.fuel_type,
      transmission: processedVehicleDetails.transmission,
      drive_type: processedVehicleDetails.traction,
      location: contact.location,
      description: contact.additionalInfo || "",
      contact_phone: contact.phone,
      car_token: car_token?.trim(),
      status: "disponible",
    };

    // Remove undefined/null/empty values
    return Object.fromEntries(
      Object.entries(payload).filter(([, value]) => {
        if (typeof value === "number") return !Number.isNaN(value);
        return value !== undefined && value !== null && value !== "";
      })
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const { vehicleDetails, contact, photos, car_token } = formData;

    setIsSubmitting(true);
    clearPublishStatus();

    try {
      // Upload images
      const uploadedUrls = await carService.uploadCarImages(photos);

      if (!uploadedUrls?.length) {
        throw new Error("No se generaron enlaces para las fotos");
      }

      // Create and submit payload
      const payload = createCarPayload(
        vehicleDetails,
        contact,
        car_token,
        uploadedUrls[0]
      );
      await carService.createCarListing(payload, uploadedUrls);

      // Success
      showPublishFeedback("success", "¡Tu anuncio se publicó correctamente!");
      setFormData(getInitialFormState());
      setCurrentStep(1);

      // Iniciar countdown para redirect automático
      setTimeout(() => {
        startRedirectCountdown();
      }, 1000); // Esperar 1 segundo antes de iniciar countdown
    } catch (error) {
      console.error("Failed to create car listing:", error);

      const isUploadError = error.message?.includes("fotos");
      showPublishFeedback(
        "error",
        isUploadError
          ? "No se pudieron subir las fotos. Inténtalo nuevamente."
          : "No se pudo publicar el anuncio. Inténtalo nuevamente."
      );
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
              Paso {currentStep} de {STEPS_CONFIG.length}
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
                clearStatus();
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
                {STEPS_CONFIG.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = currentStep > step.id;
                  const isCurrent = currentStep === step.id;

                  return (
                    <div key={step.id}>
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
                            {step.title}
                          </div>
                          <div className="text-xs text-gray-500 hidden sm:block">
                            {step.description}
                          </div>
                        </div>
                      </div>
                      {index < STEPS_CONFIG.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-4 ${
                            currentStep > step.id
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
            {/* Feedback general */}
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

              {currentStep < STEPS_CONFIG.length ? (
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

      {/* Toast Notification Success */}
      {publishStatus.visible && publishStatus.type === "success" && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="rounded-lg border shadow-lg px-4 py-4 transition-all duration-300 transform translate-y-0 opacity-100 border-green-200 bg-green-50 text-green-800">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{publishStatus.message}</p>
                <p className="text-xs text-green-700 mt-1">
                  Tu anuncio ya está disponible para los compradores.
                </p>
                {isRedirecting && redirectCountdown > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-700">
                      Regresando al inicio en {redirectCountdown} segundos...
                    </span>
                  </div>
                )}
                {isRedirecting && (
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelRedirect}
                      className="h-7 px-2 text-xs border-green-300 text-green-700 hover:bg-green-100"
                    >
                      Quedarse aquí
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => router.push("/")}
                      className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"
                    >
                      Ir ahora
                    </Button>
                  </div>
                )}
              </div>
              <button
                onClick={hidePublishFeedback}
                className="flex-shrink-0 rounded-md p-1 hover:bg-white/50 transition-colors text-green-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Error */}
      {publishStatus.visible && publishStatus.type === "error" && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="rounded-lg border shadow-lg px-4 py-3 pr-12 transition-all duration-300 transform translate-y-0 opacity-100 border-red-200 bg-red-50 text-red-800">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{publishStatus.message}</p>
              </div>
              <button
                onClick={hidePublishFeedback}
                className="flex-shrink-0 rounded-md p-1 hover:bg-white/50 transition-colors text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellCar;
